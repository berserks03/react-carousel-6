# React carousel

## Setup environment
#### Create directory and setup `package.json` file
```
mkdir react-carousel
cd react-carousel
npm init -y
```
#### Install react and react-dom
```
npm i react react-dom
```
#### Create `public` folder with `index.html` file and `src` folder with `index.tsx` and `App.tsx` files 
```
mkdir public
ni public/index.html
mkdir src
ni src/index.tsx
ni src/App.tsx
```
```html
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
    </head>
    <body>
        <div id='root'></div>
    </body>
</html>
```
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
```javascript
import React from 'react';

const App = () => {
  return(
    <div>
      <h1>Hello world!</h1>
    </div>
  );
};

export default App;
```
#### Install Webpack
```
npm i --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
```
#### Install loaders for Webpack
```
npm i --save-dev html-loader css-loader style-loader sass-loader sass
```
#### Install Typescript
```
npm i --save-dev typescript ts-loader @types/react @types/react-dom
```
#### Install Babel 
```
npm i --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime @babel/runtime babel-loader 
```
#### Install ESLint
```
npm i --save-dev eslint eslint-webpack-plugin
```
#### Configure Webpack
```
ni webpack.config.js
```
```javascript
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  output: {
    path: __dirname + '/dir',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.svg/,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
  ],
};

```
#### Configure Babel
```
ni babel.config.json
```
```javascript
{
  "presets": [ "@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript" ]
}
```
#### Configure ESLint
```
ni .eslintrc.js
```
```javascript
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
    }),
  ],
  
};
```
#### Configure Typescript
```
ni tsconfig.json
```
```javascript
{
    "compilerOptions": {
      "sourceMap": true,
      "outDir": "./dir/",
      "noImplicitAny": true,
      "module": "es6",
      "target": "es5",
      "jsx": "react",
      "allowJs": true,
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true
    },
    "include": ["src/index.tsx"]
  }
```
#### Alias commands by adding to the scripts section of `package.json` file
```javascript
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --mode development --open --hot"
  },  
}
```
## Project setup
```
npm i
```

#### Compile
```
npm run build
```

#### Run development server
```
npm start
```

