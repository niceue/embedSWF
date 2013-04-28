@echo off

set file=embedSWF

uglifyjs %file%.debug.js -o %file%.js -c -m --comments "/\/*!/"

pause