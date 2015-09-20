#!/bin/bash
# 
# This scripts autoprefixes css, renders static pages
# css:
#     copy original file to [name].css.src
# swig files:
#     if {# static, [path] #} comment is found on the first line,
#     it is rendered, and stored to [path] in www/ directory
#

BASE=`pwd`
SWIG_RENDER=${BASE}/"node_modules/swig/bin/swig.js"
POSTCSS=${BASE}/$(find node_modules/ -path "*/bin/postcss")
BLOG_PREP="${BASE}/blogPrep.js"

# render .swig with static comment
function renderSWIG() {
    (cd view ;
        PATTERN='\{# static, (.+) #\}'
        for i in `find . -name "*.swig"`
        do
            HEADER=`head -1 $i`
            [[ $HEADER =~ $PATTERN ]]
            OUTF=${BASH_REMATCH[1]}
            if [ $OUTF ] 
            then
                echo "Render $i -> $OUTF"
                mkdir -p "$BASE/www/$(dirname $OUTF)"
                "$SWIG_RENDER" render "$i" > "$BASE/www/$OUTF"
            fi
        done;
    )
}


# run autoprefixer, minify css
function processCSS() {
    (cd www ;
        for i in `find . -name "*.css"`
        do
            echo "autoprefix, minify $i"
            sed -i.src -e '' "$i"
            "$POSTCSS" --use autoprefixer \
                       --autoprefixer.browsers="> 5%, last 2 versions" \
                       "$i.src" -o "$i"
        done
    )
}

# render blog
function renderBlog() {
    node blogPrep
}

# depoly!
renderSWIG;
processCSS;
renderBlog;
