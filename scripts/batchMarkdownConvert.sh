#!/bin/sh

if [ "$1" = "" ] || [ "$2" = "" ] || [ "$1" = "-h" ] || [ "$1" = "--help" ];
then
    echo "A script to squash merge a branch into master"
    echo "	batchMarkdownConvert [--help|-h] <markdownFolder> <outputHtmlFolder>"
    exit
fi

markdownFolder=$1
outputHtmlFolder=$2

if [ ! -d "$markdownFolder" ]; then
  echo "markdown folder does not exist"
  exit
fi

if [ ! -d "$outputHtmlFolder" ]; then
  mkdir -p $outputHtmlFolder
else
  rm $outputHtmlFolder/*
fi

files="$markdownFolder/*"
for filename in $files
do
  fileOutPutName="$outputHtmlFolder/$(echo $(basename ${filename}) | sed 's/.md/.html/')"
  ./markdownToStaticHtml.sh "$filename" "../blog.html" $fileOutPutName
  echo "Created File $fileOutPutName"
done
