# Mincreator
This is an electron app where you can upload a file and get its fully compressed version. Everything is very simple, you just need to select the file that you are going to minify and after that choose where you want to save the minified file.

#Demo
There you can see result of minifying :

| File  | Before | After |
|:-----:|:-----:|:-----:|
|index.html| 5.41 KB       | 4.23 KB      |
|bootstrap.css |187 KB       | 143 KB      |
|react.js | 626 KB       | 173 KB      |

# Installation
```
npm i && npm run start
```

# How does the code become minified?

#### HTML 

* unnecessary spaces are removed
* removed all comments

+ removed empty attributes
+ removed attributes quotes
+ boolean attributes are collapsed

* removed optional tags
* used short doctype

+ minified CSS in style elements and style attributes
+ minified JavaScript in script elements and event attributes

#### CSS

* unnecessary spaces are removed
* removed all comments

+ recursively optimize blocks, like ```@media``` or ```@keyframe``` 
+ recursively optimize properties 

* removed duplicate rulesets
* merged adjacent rulesets
* removed redefined styles
* merge media queries

#### JavaScript

* unnecessary spaces are removed
* removed all comments
* removed unused code
* removed unreachable code

+ applied optimizations for ```if-s``` and conditional expressions
+ optimizations for boolean context (```!!a ? b : c → a ? b : c```)
+ optimizations for if/return and if/continue

* join consecutive ```var```, ```let```, ```const``` statements
* mangled names

+ discard calls to ```console.*``` functions

# Contributing
The main goal of this repository is to continue the development of the Mincreator app, which makes it faster and easier to use. We are grateful to the community for making corrections and improvements.

# License

Mincreator is [MIT licensed](./LICENSE). Copyright (c) 2019, David Ziarmand