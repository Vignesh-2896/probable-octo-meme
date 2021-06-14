# probable-octo-meme
Calculator made using HTML, CSS and JavaScript.

UI & UX Changes:
Calculator UI is fairly simple. Onclick of each number, it will be append to the calculator display. This will be the first operand.
Once one of the operations are selected, the next set of numbers input will form the second operand.

Keyboard support has been included.

Each Number/Operation button will change background color on click to indicate that it was clicked.

You can input an expression with multiple operators. For example : 12 + 7 - 5 * 3. If two operators and an operator are present, and another operator is select the following will happen :
1. System will first process the given two operands based on the given operator.
2. System will take the output of the above expression as the first operand while processing the next operator and operand.


Validation :
Calculator will accept an input upto 10 characters including the decimal point.

Following Errors have been included :
1. When operation is selected without first operand.
2. X/0 operation where X is any number.
3. When output of required operation with the input operands exceeds 10 characeters.

[Live Demo](https://vignesh-2896.github.io/probable-octo-meme/)
