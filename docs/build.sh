#!/usr/bin/env bash
set -eou pipefail
cd "$(dirname "$0")"/..

echo "Base directory is \"$PWD\""

if ! command -v docker-asciidoctor &> /dev/null
then
    echo "You need do install the docker-asciidoctor scripts!"
    echo "They are available at https://github.com/paulojeronimo/dotfiles/tree/master/.scripts/docker"
    exit 1
fi

BUILD_DIR=${BUILD_DIR:-public/docs}
ASCIIDOCTOR_ATTRS=${ASCIIDOCTOR_ATTRS:--a linkcss}

if [ $# = 1 ]
then
    case "$1" in
        detached|production) echo "Generating \"$1\" documents ...";;
    esac
    case "$1" in
        detached) ASCIIDOCTOR_ATTRS="$ASCIIDOCTOR_ATTRS -a uri-app=http://localhost:3000";;
        production)
            touch docs/*.adoc # <- force all HTML and PDF to be regenerated
            ASCIIDOCTOR_ATTRS="$ASCIIDOCTOR_ATTRS -a uri-app=https://finisher.tech/fibonacci-app"
            ;;
    esac
fi

mkdir -p "$BUILD_DIR"

# TODO: implement this correctly:
generate-adocs() {
    local n_refs=8
    local n_articles=13
    local refs=docs/fibonacci-refs.yaml
    local refs_json=${refs%.yaml}.json

    refs_json=${refs_json##*/}
    mkdir -p docs/generated
    touch docs/generated/artigos-introdutorios.adoc
    if [ "$refs" -nt "$BUILD_DIR"/$refs_json ]
    then
        echo "Generating \"$BUILD_DIR/$refs_json\" ..."
        yq -o=json eval $refs > "$BUILD_DIR"/$refs_json
    fi
    ASCIIDOCTOR_ATTRS="$ASCIIDOCTOR_ATTRS -a n-refs=$n_refs -a n-articles=$n_articles"
}

mkdir -p docs/images
svg=docs/images/fibonacci.svg
[ -f $svg ] || {
    echo "Generating $svg from fibonacci.tex ..."
    tex2svg "$(cat docs/fibonacci.tex)" > $svg
}

generate-adocs

for doc in $(find docs -maxdepth 1 -type f -name '*.adoc')
do
    base_file=$(basename "${doc%.adoc}")
    #base_file=${base_file/./-}
    html_file=$base_file.html
    pdf_file=$base_file.pdf
    case "$html_file" in
        fibonacci-app.pt.html) html_file=index.html;;
    esac
    attrs="$ASCIIDOCTOR_ATTRS -a html-file=$html_file -a pdf-file=$pdf_file" 
    if [ $doc -nt "$BUILD_DIR"/$html_file ]
    then
        echo "Generating $html_file and $pdf_file from $doc in directory \"$BUILD_DIR\" ..."
        docker-asciidoctor $attrs $doc -D "$BUILD_DIR" -o $html_file
        docker-asciidoctor-pdf $attrs $doc -D "$BUILD_DIR" -o $pdf_file
    fi
done

rsync -a --update --delete \
    --exclude fibonacci.svg \
    docs/images \
    "$BUILD_DIR"

serve_config="$BUILD_DIR/serve.json"
if ! [ -f "$serve_config" ]
then
    echo "Generating \"$serve_config\" file ..."
    cat > "$serve_config" <<'EOF'
{
  "cleanUrls": false
}
EOF
fi

# Fix the owner for the generated docs (using Linnux I have to do
# some changes the scripts above)
case `uname` in
    Linux) sudo chown -R $USER: .;;
esac

# vim: ts=4 sw=4 et
