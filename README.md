# eslint-plugin-react-printhardcodedtext

Eslint plugin for detecting and printing hardcoded text in React JSX templates. Based on https://github.com/yannickcr/eslint-plugin-react  jsx-no-literals rule

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-react-printhardcodedtext`:

```
$ npm install eslint-plugin-react-printhardcodedtext --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-react-printhardcodedtext` globally.

## Usage

Add `react-printhardcodedtext` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "react-printhardcodedtext"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "react-printhardcodedtext/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





