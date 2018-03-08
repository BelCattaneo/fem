const math = require("mathjs");
function matrixIndexes(matrix, fn) {
  matrix.forEach((row, y) => {
    row.forEach((node, x) => {
      fn(x, y);
    })

  });
}

function getNodeByIndexes(matrix, x, y) {
  return matrix[y][x];
}

function sumBorderNodes(matrix, x, y) {
  return [
    getNodeByIndexes(matrix, x    , y - 1), 
    getNodeByIndexes(matrix, x + 1, y), 
    getNodeByIndexes(matrix, x    , y + 1), 
    getNodeByIndexes(matrix, x - 1, y)
  ].reduce((acc, el) => {
    return acc + el;
  }, 0);
}

function innerMatrixIndexes(matrix, fn) {
  matrixIndexes(matrix, (x, y) => {
    if(!(x === 0 || y === 0 || y === matrix.length -1 || x === matrix.length - 1)) {
      fn(x, y);
    }
  })
}


function buildConstantMatrix(matrix) {
  const constants = [];

  innerMatrixIndexes(matrix, (x, y) => {
    constants.push(sumBorderNodes(matrix, x, y));
  })
  

  return constants;
}

function chooseTemperature(temperatures, size, x, y) {
  if(x === 0 && y === 0) {
    return (temperatures.top + temperatures.left) / 2;
  }

  if(x === size - 1 && y === size - 1) {
    return (temperatures.right + temperatures.bottom) / 2;
  }

  if(x === size - 1 && y === 0) {
    return (temperatures.right + temperatures.top) / 2;
  }

  if(x === 0 && y === size - 1) {
    return (temperatures.left + temperatures.bottom) / 2;
  }

  if(x === 0) {
    return temperatures.left;
  }

  if(x === size - 1) {
    return temperatures.right;
  }

  if(y === 0) {
    return temperatures.top;
  }

  if(y === size - 1) {
    return temperatures.bottom;
  }

  return 0;
}

function createMatrix(temperatures, size) {
  const matrix = [];
  for(let j = 0; j < size; j++) {
    matrix.push([]);
    for(let i = 0; i < size; i++) {
      matrix[j][i] = chooseTemperature(temperatures, size, i, j);
    }
  } 

  return matrix;
}


let matrix = createMatrix({top: 10, right: 20, bottom: 30, left: 40}, 4);
console.log(matrix)

let constantMatrix = buildConstantMatrix(matrix);
console.log(constantMatrix);

function buildCoeficientMatrix(size){
  const matrix = [];
  for(let j = 0; j < size; j++) {
    matrix.push([]);
    for(let i = 0; i < size; i++) {
      if(i===j){
        matrix[j][i] = 1;
      } else if(i+j === size-1){
        matrix[j][i] = 0;
      } else {
        matrix[j][i] = -1/4;
      }
    }
  }
  return matrix; 
}
let coeficientMatrix = buildCoeficientMatrix(4);
console.log(coeficientMatrix);

let determinant = math.det(coeficientMatrix);
console.log(determinant);

function clone(obj){
  return JSON.parse(JSON.stringify(obj));
}

function replaceWithConstantMatrix(coeficientMatrix, constantMatrix, index){
  let newCoeficientMatrix = clone(coeficientMatrix);
  for (let i = 0; i < constantMatrix.length; i++) {
    newCoeficientMatrix[i][index] = constantMatrix[i];    
  }

  return newCoeficientMatrix;
}
console.log(replaceWithConstantMatrix([[1,1,1],[1,1,1],[1,1,1]], [55,22,55], 0));

function getResults(coeficientMatrix, constantMatrix){
  const determinant = math.det(coeficientMatrix);
  console.log(determinant);
  let results = [];

  console.log(coeficientMatrix);
  for(i = 0; i < constantMatrix.length; i++){
    console.log(constantMatrix);
    console.log(math.det(replaceWithConstantMatrix(coeficientMatrix, constantMatrix, i)));
    results.push((math.det(replaceWithConstantMatrix(coeficientMatrix, constantMatrix, i)) / determinant)/4);
  }

  return results;
}

let results = getResults(coeficientMatrix, constantMatrix);
console.log(results);

function buildFinalMatrix(matrix, results){
  let index = 0;
  let finalMatrix = clone(matrix);
  for (let i = 0; i < finalMatrix.length; i++) {
    for (let j = 0; j < finalMatrix[i].length; j++) {
      if (finalMatrix[i][j] === 0) {
        finalMatrix[i][j] = results[index];
        index++;
      }      
    }
  }
  return finalMatrix;
}

console.log(buildFinalMatrix(matrix, results));
