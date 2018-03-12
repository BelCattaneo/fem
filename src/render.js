
function parseMatrixIndexes(tempMatrix, screenSize){
  let data = [];
  let factor = screenSize / (tempMatrix.length-1);
  console.log("Factor: "+factor);
  console.log("ScreenSize: "+screenSize)
  for (let i = 0; i < tempMatrix.length; i++) {
    for (let j = 0; j < tempMatrix[i].length; j++) {
      data.push({x : factor * j, y : factor * i, value : tempMatrix[i][j]});
    }    
  }
  console.log(data);
  return data;
}

function createHeatmapDataObject(tempMatrix, screenSize){
  return {
    max : math.max(math.max(tempMatrix)),
    data : parseMatrixIndexes(tempMatrix, screenSize)
  };
  
}


