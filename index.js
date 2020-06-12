/* 
    INPUT: return n ** n;

    OUTPUT: [return, n, **, n, ;];

    GOAL: To separate into tokens
*/
function lexer(code) {
    // separates for whitespace character
    return code.split(/\s+/)
        // filter by the "tokens" found after separating
        .filter(function (t) {
            return t.length > 0;
        }).map(function (t) {
            // checks if the token is a string / number
            return isNaN(t) ? {
                type: "word",
                value: t
            } : {
                    type: "number",
                    value: t
                }
        })
}

/* 
    INPUT: Token array from lexer
    OUTPUT: Makes an AST structure (could be a JSON) containing
        the proper syntax types 
*/
function parser(tokens) {
    var AST = {
        type: "Drawing",
        body: []
    }

    while (tokens.length > 0) {
        // Grab first element each time
        var curr_token = tokens.shift();

        if (curr_token.type === "word") {
            switch (curr_token.value) {
                // Creates MEMBER nodes with properties
                case: "Paper":
                    var expression = {
                        type: "CallExpression",
                        name: "Paper",
                        arguments: []
                    }

                    // Gets the number from the callexpression
                    // Pen 0 <- gets the 0
                    // Which should normally come after the callexpression
                    var argument = tokens.shift()
                    if (argument.type === "number") {
                        expression.arguments.push({
                            type: "NumberLiteral",
                            value: argument.value
                        })

                        AST.body.push(expression)
                    } else {
                        throw "Paper command must be followed by a number"
                    }
                    break;
                case "Pen":
                    var expression = {
                        type: "CallExpression",
                        name: "Pen",
                        arguments: []
                    }

                    var argument = tokens.shift()
                    if (argument.type === "number") {
                        expression.arguments.push({
                            type: "NumberLiteral",
                            value: argument.value
                        })

                        AST.body.push(expression)
                    } else {
                        throw "Pen command must be followed by a number"
                    }
                    break;
                case "Line":
                    var expression = {
                        type: "CallExpression",
                        name: "Pen",
                        arguments: []
                    }

                    var argument = tokens.shift()
                    if (argument.type === "number") {
                        expression.argument.push({
                            type: "NumberLiteral",
                            value: argument.value
                        })

                        AST.body.push(expression)
                    } else {
                        throw "Line command must be followed by a number"
                    }
                    break;
            }
        }
    }

    return AST;
}


/* 
    Sometimes transformers can take AST
    and manipulate the given AST to another
    form of AST to better suit the scenario
*/
function transformer(ast) {
    var svg_ast = {
        tag: "svg",
        attr: {
            width: 100, height: 100, viewBox: "0 0 100 100",
            xmlns: 'http://www.w3.org/2000/svg', version: '1.1'
        },
        body: []
    }

    var pen_color = 100

    while (ast.body.length > 0) {
        var node = ast.body.shift()

        switch (node.name) {
            case: "Paper":
                var paper_color = 100 - node.arguments[0].value
                svg_ast.body.push({
                    tag: "rect",
                    attr: {
                        x: 0, y: 0,
                        width: 100, height: 100,
                        fill: 'rgb(' + paper_color + '%,' + paper_color + '%,' + paper_color + '%)'
                    }
                })
                break;
            case "Pen":
                pen_color = 100 - node.arguments[0].value
                break;
            case "Line":
                pen_color = 100 - node.arguments[0].value
                break;
        }
    }

    return svg_ast
}