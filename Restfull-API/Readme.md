## Student details (API)

It has the data of Student with id, name and department

## Features

REST API has following functionalities:

- GET
- POST
- PUT
- PATCH
- DELETE

## Prerequisites

## Installations

For this project the following modules are required to be installed as developer dependencies. Copy the given codes in terminal for installation of the modules

To [install](https://www.npmjs.com/package/jest) Jest for unit testing

```Bash
npm install --save-dev jest
```

To [install](https://www.npmjs.com/package/axios) Axios to help with checking the endpoints of the API in unit testing

```Bash
npm install axios
```

To [install](https://www.npmjs.com/package/jsdoc) Jsdoc for documentation

```Bash
npm install --save-dev jsdoc
```

To [install](https://www.npmjs.com/package/swagger-jsdoc) Swagger-jsdoc to generate swagger documentation using jsdoc annotated source

```Bash
npm install swagger-jsdoc
```

To [install](https://www.npmjs.com/package/swagger-ui-express) Swagger-ui-express to generate swagger-ui API documentation for express

```Bash
npm install swagger-ui-express
```

To [install](https://www.npmjs.com/package/eslint) Eslint for linting

```Bash
npm install --save-dev eslint
```

## Configuration

Replace the following with the script object in package.json file

```JSON
"scripts": {
    "test": "jest --coverage --forceExit",
    "jsdoc": "jsdoc -c jsdoc.json",
    "lint": "eslint ./",
    "start": "node ./src/server.js"
  }
```

#### [Jest](https://jestjs.io/)

Creat a test folder on the same hierarchy as the src folder if it does not exist and create test according to your requirements. The test file should follow the given naming convention ` modulle_name.test.js`. If a test file already exist you can add your required test cases in that file

#### [Axios](https://axios-http.com/docs/intro)

No specific COnfiuration is required for axios as it is as required depency for the ` modulle_name.test.js` file to help chek the endpoints of the API.

#### [JsDoc](https://jsdoc.app/index.html)

Create a jsdoc.jason file in the main folder and copy the below given default template

```JSON
{
  "plugins": ["plugins/markdown"],
  "recurseDepth": 10,
  "source": {
    "include": ["src"],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|jsdoc)"
  },
  "sourceType": "module",
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc", "closure"]
  },
  "templates": {
    "default": {
      "outputSourceFiles": false
    },
    "cleverLinks": true,
    "monospaceLinks": true
  },
  "opts": {
    "destination": "./jsdoc",
    "recurse": true,
    "readme": "./readme.md"
  }
}
```

#### [Swagger](https://swagger.io/docs/)

The specification required for Swagger documentation is done in the main moudule file. In it we have to specify the server where the documentation is hosted and the route for the documentation with the information about the module

#### [Eslint](https://eslint.org/)

Run the given code in terminal to intialize eslint in the project

```Bash
./node_modules/.bin/eslint --init
```

Copy the Following in rules of the eslint config file to get no linting errors

```JSON
{
     "semi": ["error", "always"],
    "no-use-before-define": "error",
    "linebreak-style": 0,
    "indent": ["error", 4, { "SwitchCase": 1 }],
    "comma-dangle": [2, "always-multiline"],
    "no-restricted-globals": ["error", "event", "fdescribe"]
}
```

Create a .eslintignore file and copy the following in it

```
/node_modules
```

## Run the components

#### Jest

To run Jest for unit testing run the given command in your terminal

```Bash
npm run test
```

This will run all the files in the test folder to check all the test cases and also provide you with the code coverage

#### Jsdoc

To run Jsdoc for documentation run the given command in your terminal

```Bash
npm run jsdoc
```

This will create teh documentation folder in the main folder wher you can find the index.html for all the documentaion

#### Eslint

To run Jsdoc for linting the folder run the given command in your terminal

```Bash
npm run lint
```

This lint all the files except those in the .eslintignore file for any linting error present
