@echo off

set SRC=embedSWF.debug.js
set MIN=embedSWF.js

uglifyjs %SRC% -o %MIN% -c -m --comments "/\/*!/"