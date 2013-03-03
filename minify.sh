#/bin/sh

rm js/min.js
mv js/arbor* js/gallery.js js/shortcut.js js/jquery.min.js js/jquery.history.js js/jquery.autoSuggest.minified.js js/jquery-ui-1.10.1.custom.min.js .
ruby minify.rb js/* js/min.js
mv *.js js/
