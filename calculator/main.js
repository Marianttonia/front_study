var grid = ''
var resultValue = ''
var firstNumber, operator, finalNumber, resultRegex, manipulationCalcule, operatorIndex, limitIndex, firstfinaly
const regex = /(\d+(\.\d+)?|[\+\-\*\/x(){}\[\]])/g

// resultRegex = ['3', '-', '(', '+', '7', ')', 'x', '(', '-', '5', ')'] 
// resultRegex = ['8', '-', '(', '6', ')']

function handleCharacter(character) {
  grid += character.id
  gridhtml.innerHTML = grid
  resultRegex = grid.match(regex)
}
function clean() { 
  grid = grid.slice(0,-1)
  gridhtml.innerHTML = grid
}
function cleanAll() {
  grid = ''
  gridhtml.innerHTML = grid
}

// validation()

function validation() {
  if (grid == '') {
    alert("Digite a operacao desejada");
  } else {
    try {
      result()
      gridhtml.innerHTML = resultValue
      console.log(resultValue, resultRegex, manipulationCalcule)
    } catch(e) {
      alert('Digite a expressao corretamente' , e.messsage)
      alert('Para positivos use (+n) e negativos (-n)')
    }
  }
}


function result() {
  manipulationCalcule = resultRegex.slice() 
  if ((precedenceIndex = resultRegex.findIndex(el => el === '(')) !== -1) {
    if (limitIndex = resultRegex.findIndex(limit => limit === ')' ))
        integerCheck()
        precedenceOrder(precedenceIndex) // até q ok
      }
      if ((precedenceIndex = resultRegex.findIndex(el => el === '[')) !== -1) {
        if (limitIndex = resultRegex.findIndex(limit => limit === ']' )) {
          integerCheck()
          precedenceOrder(precedenceIndex)
        } 
      } 
      if ((precedenceIndex = resultRegex.findIndex(el => el === '{')) !== -1) {
        if (limitIndex = resultRegex.findIndex(limit => limit === '}' )) {
          integerCheck()
          precedenceOrder(precedenceIndex)
        } 
      } // verify finaly etapa integercheck
      precedenceOrder(precedenceIndex)
      if (isNaN(resultValue)) {
        throw Error ('Expressao invalida')
      } // recebe o result value e o tratamento de erro ja foi feito
} console.log(resultValue)

function precedenceOrder(precedenceIndex) {
  if (manipulationCalcule.length > 1) {
    var initIndex = Number(precedenceIndex+1)
    manipulationCalcule = manipulationCalcule.slice(initIndex, limitIndex)
    calculeLength = (Number(manipulationCalcule.length)) +2
    coreCalculator() // call corecalculator, AQUI ESTÁ O ERRO DA ÚLTIMA CHAMADA
    if (manipulationCalcule.length > 1) {
      resultRegex.splice(precedenceIndex, calculeLength)
      resultRegex.splice(precedenceIndex, 0, resultValue)
      manipulationCalcule = resultRegex
    }
  }
    resultRegex = manipulationCalcule
    return resultValue
}

    
function coreCalculator() {
  if ((operatorIndex = manipulationCalcule.findIndex(el => el === 'x' || el === '/')) !== -1){
    calculator(operatorIndex-1, operatorIndex, operatorIndex+1)
  }
  if ((operatorIndex = manipulationCalcule.findIndex(el => el === '+' || el === '-')) !== -1) {
    calculator(operatorIndex-1, operatorIndex, operatorIndex+1)
  }
  return resultValue
}
      
function calculator(beforePrevius, previus, afterPrevius){
  firstNumber = Number(manipulationCalcule[beforePrevius])
  operator = manipulationCalcule[previus] 
  finalNumber = Number(manipulationCalcule[afterPrevius])
  console.log("pars calc" ,firstNumber, operator, finalNumber)
  if (operator === '/') {
      resultValue = firstNumber / finalNumber
  }
  if (operator === 'x') {
      resultValue = firstNumber * finalNumber
  }
  if (operator === '+') { 
      resultValue = firstNumber + finalNumber
  }
  if (operator === '-') {
      resultValue = firstNumber - finalNumber
  }
  if (manipulationCalcule.length > 0) {
      manipulationCalcule.splice(beforePrevius, 3, resultValue) 
      console.log(resultValue, manipulationCalcule)
  }
  return resultValue
}

function integerCheck() {
  if (firstClose = resultRegex.findIndex(firstFinaly => firstFinaly === ')')) {
    var verifyRational = manipulationCalcule.slice(firstClose-2, firstClose)
    var firstOpen = Number(firstClose-3)
    if (resultRegex[firstOpen] === '(' ) {
      verifyRational = Number(verifyRational.join('')) // take fist numb okay
        if (Math.sign(verifyRational) !== NaN) { 
          resultRegex.splice(firstOpen, 4)
          resultRegex.splice(firstOpen, 0, verifyRational)
          result()
      }
    } 
  }
} 

