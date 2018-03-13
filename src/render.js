

function readValues() {
  return {
    top: parseInt($("#top").val()),
    right: parseInt($("#right").val()),
    left: parseInt($("#left").val()),
    bottom: parseInt($("#bottom").val()),
    size: parseInt($("#size").val())
  }  
}

function matrixToHeatmapNodes(tempMatrix, screenSize){
  let data = [];
  let factor = screenSize / (tempMatrix.length-1);
  for (let i = 0; i < tempMatrix.length; i++) {
    for (let j = 0; j < tempMatrix[i].length; j++) {
      data.push({x : factor * j, y : factor * i, value : tempMatrix[i][j]});
    }    
  }
  return data;
}

function createHeatmapDataObject(tempMatrix, screenSize){
  return {
    max : math.max(math.max(tempMatrix)),
    data : matrixToHeatmapNodes(tempMatrix, screenSize)
  }; 
}

function renderMatrix($elem, matrix, {withRounding, vertical} = {}) {
  $elem.empty();

  const render = (td) => {
    return (elem) => {
      const tr = document.createElement("tr");
      tr.innerHTML = withRounding ? Math.round(elem) : elem;
      td.appendChild(tr);
    }
  }

  let td = document.createElement("td");

  for(let x = 0; x < matrix.length; x++) {
    if(!vertical) {
      td = document.createElement("td");
    }

    if(matrix[x].length) {
      for (let y = 0; y < matrix.length; y++) {
        render(td)(matrix[y][x])
      }
    } else {
      render(td)(matrix[x])
    }


    $elem.append(td);
  }
}


