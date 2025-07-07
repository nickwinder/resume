#!/bin/sh

if [ "$1" = "" ] || [ "$2" = "" ] || [ "$3" = "" ] || [ "$1" = "-h" ] || [ "$1" = "--help" ];
then
    echo "A script to squash merge a branch into master"
    echo "	markdownToStaticHtml [--help|-h] <markdownFile> <htmlTemplate> <outputHtmlFile>"
    exit
fi

markdownFile=$1
htmlTemplate=$2
outputHtmlFile=$3

pandoc $markdownFile -o tempSnippet.html
if [ -f $outputHtmlFile ]; then
  rm $outputHtmlFile
fi

# Remove the first new lines after the heading as it makes it easier to process
sed -i '' -e ':a' -e 'N;$!ba' -e 's/\n//1' tempSnippet.html

# wrap the h1 tag in a content-card
sed -i '' '1s/^/<div class="content-card">/' tempSnippet.html

# create a new content-card everytime h2 is seen
sed -i '' 's/<h2/<\/div><div class="content-card"><h2/g' tempSnippet.html

# Ensure there is no empty content-cards
sed -i '' 's/<div class="content-card"><\/div>//g' tempSnippet.html

# Close the last content card
echo '</div>' >> tempSnippet.html

# Replace the tag in the template with the modified html from markdown
sed -e '/(#!blogPost)/{r tempSnippet.html
d;}' $htmlTemplate > $outputHtmlFile

rm tempSnippet.html
