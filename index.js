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
