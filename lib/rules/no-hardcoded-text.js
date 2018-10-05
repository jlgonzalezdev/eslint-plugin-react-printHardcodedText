/**
 * @fileoverview Detect and print any hardcoded text in JSX Templates
 * @author Jlgonzalezdev
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Detect and print any hardcoded text in JSX Templates",
            category: "Hardcoded",
            recommended: false
        },
        schema: [{
            type: 'object',
            properties: {
                noStrings: {
                    type: 'boolean'
                }
            }
        }],
        additionalProperties: false,
        fixable: null,  // or "code" or "whitespace"
    },
    create: function (context) {
        const sourceCode = context.getSourceCode();
        const config = context.options[0] || {},
            isNoStrings = config.noStrings || false;

        const message = isNoStrings ?
            'Strings not allowed in JSX files' :
            'Missing JSX expression container around literal string';

        function reportLiteralNode(node) {
            context.report({
                node: node,
                message: `${message}: ${sourceCode.getText(node).trim()}`
            });
        }

        function getParentIgnoringBinaryExpressions(node) {
            let current = node;
            while (current.parent.type === 'BinaryExpression') {
                current = current.parent;
            }
            return current.parent;
        }

        function getValidation(node) {
            const parent = getParentIgnoringBinaryExpressions(node);
            const standard = !/^[\s]+$/.test(node.value) &&
                typeof node.value === 'string' &&
                parent.type.indexOf('JSX') !== -1 &&
                parent.type !== 'JSXAttribute';
            if (isNoStrings) {
                return standard;
            }
            return standard && parent.type !== 'JSXExpressionContainer';
        }
        return {

            Literal: function (node) {
                if (getValidation(node)) {
                    reportLiteralNode(node);
                }
            },

            JSXText: function (node) {
                if (getValidation(node)) {
                    reportLiteralNode(node);
                }
            },

            TemplateLiteral: function (node) {
                const parent = getParentIgnoringBinaryExpressions(node);
                if (isNoStrings && parent.type === 'JSXExpressionContainer') {
                    reportLiteralNode(node);
                }
            }

        };
    }
};
