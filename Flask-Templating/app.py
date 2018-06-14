from flask import Flask, render_template, request

app = Flask(__name__)

# @app.route('/')
# def welcome():
#     return render_template('base.html')


@app.route('/person/<name>/<int:age>')
def person(name, age):
    return render_template('person.html', your_name=name, your_age=str(age))


@app.route('/calculator')
def calculator():
    return render_template('calc.html')


@app.route('/math')
def math():
    number1 = int(request.args.get('num1'))
    number2 = int(request.args.get('num2'))
    operators = request.args.get('oper')

    if operators == 'add':
        result = number1 + number2
    elif operators == 'subtract':
        result = number1 - number2
    elif operators == 'multiply':
        result = number1 * number2
    elif operators == 'divide':
        result = number1 / number2

    return render_template('result.html', result=str(result))
