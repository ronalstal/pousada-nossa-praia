# Building / Maintaining www.pousadanossapraia.com.br

# ... Work in Progress ...  


## Installation

install [node.js](https://nodejs.org/en/download/current/) (includes `npm`)  
install the following npm modules globally:  
```
npm install -g gulp gulp-cli
```
set up your project directory:  

```bash
git clone https://github.com/ronalstal/pousada-nossa-praia.git
cd pousada-nossa-praia

# in ./src/js/, manually copy the file
# private.example.json to private.json
# and fill in your keys needed for deploy

npm install
npm run build

## in a separate terminal window:
npm start
## and point your browser to localhost:3000
```

## Overview

The goal is to build a completly **static website in several languages** (the only functionality required from the server is serving static files and a sendmail function). Actually, the following languages are implemented:
- **pt**: Portuguese
- **es**: Spanish
- **en**: English
- **fr**: French

The site consists of a `/index.html` which redirects the browser to a `{language}/index.html` according to the `navigator.languages` settings in the browser.  Default language is **pt**.

The `{language}/index.html` contains the complete page with a jQuery script to lazy-load the various sections (`{language}/{section}.html`).

#### The "src/" directory

contains all the handlebars templates (with partials and helpers), the bootstrap@4 and custom scss files and json files with the text for the implemented languages. The **static/** sub-directory contains images and scripts used by the site and will be copied *as is* to the "dev" directory.

#### The "dev/" directory

contains the development build and a simple `nodejs http` server.

#### The deployment directories "gh-pages/" and "www/"

contain the minified output from the "dev/" directory with the respective key for Google Analytics.

#### The "suisse/" directory

contains a static page for the site of the former [Hotel du Suisse](http://www.hoteldusuisse.com.br), now replaced by Pousada Nossa Praia.
Will be manually maintained and deployed to *www.hoteldusuisse.com.br* . 

## Usage

#### Run the webpack server

```
npm run watch
```

Open [localhost:3000](http://localhost:3000/) in your browser.  

Make changes in the `src` directory.



linter-jsonlint
linter-sass-lint

https://github.com/jpetitcolas/html-webpack-plugin/blob/master/examples/html-loader/webpack.config.js
