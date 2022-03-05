#!/usr/bin/env bash
set -eou pipefail
cd "$(dirname "$0")"

if ! command -v docker-asciidoctor &> /dev/null
then
    echo "You need do install the docker-asciidoctor scripts!"
    echo "They are available at https://github.com/paulojeronimo/dotfiles/tree/master/.scripts/docker"
    exit 1
fi

ASCIIDOCTOR_ATTRS=${ASCIIDOCTOR_ATTRS:--a linkcss}

for doc in $(find . -type f -name '*.adoc')
do
    docker-asciidoctor $ASCIIDOCTOR_ATTRS $doc
    docker-asciidoctor-pdf $ASCIIDOCTOR_ATTRS $doc
done

# Fix the owner for the generated docs (using Linnux I have to do
# some changes the scripts above)
case `uname` in
    Linux) sudo chown -R $USER: .;;
esac
