#!/bin/bash

tsc
cp ./src/adv-table.css ./dist
cp ./package.json ./dist
cp ./README.md ./dist
cd ./dist
npm publish