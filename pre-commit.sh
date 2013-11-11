#!/bin/sh

git stash -q --keep-index

echo "Running jshint..."

grunt jshint

RESULT=$?

git stash pop -q

exit $RESULT