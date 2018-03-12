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

function pointInBorder(matrix, x, y) {
  return (x === 0 || y === 0 || y === matrix.length -1 || x === matrix.length - 1)
}

function borderInnerMatrixIndexes(matrix, fn) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if(!pointInBorder(matrix, x, y)) {
        fn(x, y);
      }
    }    
  }
}

function borderInnerMatrixIndexesAndNeighbours(matrix, fn) {
  borderInnerMatrixIndexes(matrix, function(x, y) {
    const neighbours = [
      pointInBorder(matrix, x  , y-1)? null : {x: x  , y : y-1}, 
      pointInBorder(matrix, x+1, y  )? null : {x: x+1, y : y  }, 
      pointInBorder(matrix, x  , y+1)? null : {x: x  , y : y+1}, 
      pointInBorder(matrix, x-1, y  )? null : {x: x-1, y : y  } 
    ];

    fn(x, y, neighbours);
  });
}

function buildConstantMatrix(matrix) {
  //Devuelve la matriz de constantes.
  const constants = [];

  borderInnerMatrixIndexes(matrix, (x, y) => {
    constants.push(sumBorderNodes(matrix, x, y));
  })
  
  return constants;
}

function chooseTemperature(temperatures, size, x, y) {
  //Segun el punto en la matriz devuelve una temperatura o 0.
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
  //Crea la matriz de temperaturas en la tabla.
  const matrix = [];
  for(let j = 0; j < size; j++) {
    matrix.push([]);
    for(let i = 0; i < size; i++) {
      matrix[j][i] = chooseTemperature(temperatures, size, i, j);
    }
  } 

  return matrix;
}

function buildCoeficientMatrix(constantMatrix, matrix){
  //Crea la matriz de los coeficientes.
  let matrixCoeficients = [];
  borderInnerMatrixIndexesAndNeighbours(matrix, function(x, y, neighbours){
    matrixCoeficients.push(coeficientsRow(constantMatrix, matrix, x, y, neighbours));
  })
  return matrixCoeficients;
}

function coeficientsRow(constantMatrix, matrix, x, y, neighbours){
  let coeficientsRow = new Array(constantMatrix.length).fill(0);
  const matrixSize = math.sqrt(constantMatrix.length);
  let currentNodeIndex = matrixIndexToArrayIndex(matrixSize, x, y);
  coeficientsRow[currentNodeIndex] = 4;

  neighbours.forEach(function(neighbour){
    if (neighbour) {
      let neighbourIndex = matrixIndexToArrayIndex(matrixSize, neighbour.x, neighbour.y);
      coeficientsRow[neighbourIndex] = -1;
    }
  })

  return coeficientsRow;
}

function matrixIndexToArrayIndex(matrixSize, x, y){
  return (x-1) + (y-1) * matrixSize;
}

function clone(obj){
  return JSON.parse(JSON.stringify(obj));
}

function replaceWithConstantMatrix(coeficientMatrix, constantMatrix, index){
  //Reemplaza la columna indicada por la matriz de constantes.
  let newCoeficientMatrix = clone(coeficientMatrix);
  for (let i = 0; i < constantMatrix.length; i++) {
    newCoeficientMatrix[i][index] = constantMatrix[i];    
  }
  //console.log(newCoeficientMatrix);
  return newCoeficientMatrix;
}

function getResults(coeficientMatrix, constantMatrix){
  //Obtiene las temperaturas en los puntos interiores.
  const determinant = math.bignumber(math.det(coeficientMatrix));
  let results = [];
  console.log(coeficientMatrix); 
  console.log(constantMatrix);

  for(i = 0; i < constantMatrix.length; i++){
    let currentReplacedMatrix = replaceWithConstantMatrix(coeficientMatrix, constantMatrix, i);
    let currentReplacedMatrixDeterminant = math.bignumber(math.det(currentReplacedMatrix));
    console.log(math.divide(currentReplacedMatrixDeterminant, determinant));
    results.push(math.number(math.divide(currentReplacedMatrixDeterminant, determinant)));
  }

  return results;
}

function buildFinalMatrix(matrix, results){
  //Crea la matriz con todas las temperaturas.
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

function diferenciasFinitas(size, temperatures,  ){
  let matrix = createMatrix(temperatures, size);
  let constantMatrix = buildConstantMatrix(matrix);
  let coeficientMatrix = buildCoeficientMatrix(constantMatrix, matrix);
  let results = getResults(coeficientMatrix, constantMatrix);  
  return buildFinalMatrix(matrix, results);
}

