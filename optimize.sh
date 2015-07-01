#!/bin/bash
# 
# This scripts optimizes css, javascript, static swig pages
# css, javascripts:
#     copy original file to [name].full.(css/js)
#     replace original file with minified one
# .swig files:
#     if {# static, [path] #} comment is found on the first line,
#     it is rendered, and stored to [path] in www/ directory
#

BASE=`pwd`
JS_MINIFY=${BASE}/$(find node_modules/ -path "*/bin/minify.js")
CSS_MINIFY=${BASE}/$(find node_modules/ -path "*/bin/minify.js")
SWIG_RENDER=${BASE}/"node_modules/swig/bin/swig.js"
POSTCSS=${BASE}/$(find node_modules/ -path "*/bin/postcss")

# minify js in www/ directory
function minifyJS() {
    (cd www ;
        for i in `find . -name "*.js" -not -name "*.full.*"`
        do
            echo "Minify: $i"
            BACKF=$(dirname "$i")/$(basename "$i" .js).full.js
            cp "$i" "$BACKF"
            "$JS_MINIFY" "$BACKF" > "$i"
        done;
    )
}

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
            TMPF=$i.tmp.css
            "$POSTCSS" --use autoprefixer \
                       --autoprefixer.browsers="> 5%, last 2 versions" \
                       "$i.src" -o "$TMPF"
            "$CSS_MINIFY" "$TMPF" > $i
            rm -f "$TMPF"
        done
    )
}

## run optimization
minifyJS;
renderSWIG;
processCSS;
