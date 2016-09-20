# Creating / Maintaining www.pousadanossapraia.com.br

# ... Work in Progress ...  


## Installation

install [node.js](https://nodejs.org/en/download/current/) (includes `npm`)  
install the following npm modules globally:  
```
npm install -g browserify
```
set up your project directory:
```
git clone https://github.com/ronalstal/pousada-nossa-praia.git
cd wwwsuisse
npm install
npm run vendor
```
for details on the `vendor` script, see the [readme in assets](./assets/README.md)

## Usage

#### Run the webpack server

```
npm run watch
```

Open [localhost:3000](http://localhost:3000/) in your browser.  

Make changes in the `src` directory.
