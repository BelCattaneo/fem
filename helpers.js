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


var matrix = createMatrix({top: 10, right: 20, bottom: 30, left: 40}, 4);
console.log(matrix)

console.log(buildConstantMatrix(matrix));