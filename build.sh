#!/bin/bash

SRC=embedSWF.debug.js
MIN=embedSWF.js

uglifyjs $SRC -o $MIN -c -m --comments "/\/*!/"