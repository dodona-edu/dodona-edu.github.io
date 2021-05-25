const Prism = require("prismjs");

function loadLanguages() {
    Prism.languages['tested'] = Prism.languages.extend("javascript", {
        operator: /--|::|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*\/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
        'class-name': [
            ...Prism.languages.javascript['class-name'],
            {
                pattern: /<\w+>/
            }
        ],
        keyword: [
            ...Prism.languages.javascript.keyword,
            {
                pattern: /(^|[^.]|\.\.\.\s*)\b(integer|rational|char|text|boolean|sequence|set|map|nothing|undefined|null|new|any|int[0-9]+|uint[0-9]+|bigint|single|double|extended|fixed|array|list)\b/,
                lookbehind: true
            }
        ],
    });
    Prism.languages['text'] = {};
    Prism.languages['mako'] = Prism.languages.extend("text", {
        comment: /(?:(\s*\w(\s|\w)*))##.+/,
        punctuation: /\\/,
        directive: {
            pattern: /% (if|elif|else|endif|for|endfor).*/,
            greedy: true,
            inside: Prism.languages.clike
        },
        'expression-tag': {
            pattern: /\s*<%!?.*%>/,
            inside: Prism.languages.clike
        },
        expression: {
            pattern: /\$\{[^{}]*\}/,
            inside: Prism.languages.clike
        },
        tag: {
            pattern: /<%\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?\/>/,
            greedy: true,
            inside: {
                tag: {
                    pattern: /^<\/?[^\s>\/]+/,
                    inside: {
                        'punctuation': /^<\/?/,
                        'namespace': /^[^\s>\/:]+:/
                    }
                },
                'attr-value': {
                    pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                    inside: {
                        'punctuation': [
                            {
                                pattern: /^=/,
                                alias: 'attr-equals'
                            },
                            /"|'/
                        ]
                    }
                },
                punctuation: /\/?>/,
                'attr-name': {
                    pattern: /[^\s>\/]+/,
                    inside: {
                        'namespace': /^[^\s>\/:]+:/
                    }
                }

            }
        },
        entity: [
            {
                pattern: /&[\da-z]{1,8};/i,
                alias: 'named-entity'
            },
            /&#x?[\da-f]{1,8};/i
        ]
    });

    Prism.languages.mako['tag'].inside['attr-value'].inside['entity'] = Prism.languages.mako['entity'];
    Prism.languages.mako.directive.inside.keyword = /\b(?:if|elif|else|endif|while|do|for|endfor|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue|from|import)\b/;
    Prism.languages.mako.expression.inside.keyword = Prism.languages.mako.directive.inside.keyword;
    Prism.languages.mako.expression.inside.punctuation = {
        pattern: /[{}\[\];(),.:$]/,
        greedy: true
    };
    Prism.languages.mako['expression-tag'].inside.keyword = Prism.languages.mako.directive.inside.keyword;
    Prism.languages.mako['expression-tag'].inside.punctuation = {
        pattern: /<%!?|%>|[{}\[\];(),.:]/,
        greedy: true
    };
}

module.exports = {loadLanguages};