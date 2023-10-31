function appendToDisplay(value) {
  const display = document.getElementById('display');
  display.value += value;
}

function clearDisplay() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function clearAll() {
  const display = document.getElementById('display');
  display.value = '';
}

function calculateResult() {
  const display = document.getElementById('display').value;
  try {
    const resultado = calculateExpression(display);
    document.getElementById('display').value = resultado;
  } catch (error) {
    document.getElementById('display').value = 'Erro';
    console.error(error);
  }
}

function calculateExpression(expression) {
  try {
    // Remover espaços em branco da expressão
    expression = expression.replace(/\s/g, '');

    // Lidar com parênteses primeiro
    while (expression.includes('(')) {
      const abertura = expression.lastIndexOf('(');
      const fechamento = expression.indexOf(')', abertura);
      if (abertura === -1 || fechamento === -1) {
        throw new Error('Parênteses desbalanceados');
      }

      const trechoComParenteses = expression.slice(abertura + 1, fechamento);
      const resultadoParenteses = calculateExpression(trechoComParenteses);

      expression = expression.substring(0, abertura) + resultadoParenteses + expression.substring(fechamento + 1);
    }

    // Realizar multiplicação e divisão
    while (expression.includes('*') || expression.includes('/')) {
      const multiplicacao = expression.indexOf('*');
      const divisao = expression.indexOf('/');
      const operador = multiplicacao !== -1 ? '*' : '/';

      if (divisao !== -1 && (multiplicacao === -1 || divisao < multiplicacao)) {
        const partes = expression.split('/');
        const resultado = parseFloat(partes[0]) / parseFloat(partes[1]);
        expression = expression.replace(partes.join('/'), resultado);
      } else {
        const partes = expression.split('*');
        const resultado = parseFloat(partes[0]) * parseFloat(partes[1]);
        expression = expression.replace(partes.join('*'), resultado);
      }
    }

    // Realizar soma e subtração
    while (expression.includes('+') || expression.includes('-')) {
      const adicao = expression.indexOf('+');
      const subtracao = expression.indexOf('-');
      const operador = adicao !== -1 ? '+' : '-';

      if (subtracao !== -1 && (adicao === -1 || subtracao < adicao)) {
        const partes = expression.split('-');
        const resultado = parseFloat(partes[0]) - parseFloat(partes[1]);
        expression = expression.replace(partes.join('-'), resultado);
      } else {
        const partes = expression.split('+');
        const resultado = parseFloat(partes[0]) + parseFloat(partes[1]);
        expression = expression.replace(partes.join('+'), resultado);
      }
    }

    return parseFloat(expression);
  } catch (error) {
    throw new Error('Expressão inválida');
  }
}