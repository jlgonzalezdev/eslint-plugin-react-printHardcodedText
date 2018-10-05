/**
 * @fileoverview Detect and print any hardcoded text in JSX Templates
 * @author Jlgonzalezdev
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-hardcoded-text"),

    RuleTester = require("eslint").RuleTester;

    RuleTester.setDefaultConfig({
        parserOptions: {
          ecmaVersion: 6,
          ecmaFeatures: {
            jsx: true,
          },
        }
      });
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-hardcoded-text", rule, {

    valid: [
        {
        code: '<p>{this.state.text}</p>',
        }
    ],

    invalid: [
        {
            code: "<p>Hellow World Hardcoded text</p>",
            errors: [{
                message: "Missing JSX expression container around literal string: Hellow World Hardcoded text",
                        }]
        },{
            code: "<p>`Hellow ${World}`</p>",
            options: [{noStrings: true}],
            errors: [{
                message: "Strings not allowed in JSX files: `Hellow $",
            },{
                message: "Strings not allowed in JSX files: `",
            }]
        }
    ]
});
