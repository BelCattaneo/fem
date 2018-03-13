const screenSize = 600;

function renderHeatmap(heatmap, tempMatrix, screenSize){
  heatmap().setData(createHeatmapDataObject(tempMatrix, screenSize));
}

function createHeatmap(){
  return h337.create({
    container: $("#heatmap")[0]
  }); 
}


$(document).ready(function() {
  //createHeatmap();

  $("#run").click(function() {
    $("#heatmap").empty();

    const {size, top, right, bottom, left}  = readValues();
    const {constantMatrix, coeficientMatrix, finalMatrix} = diferenciasFinitas(size, {top, right, bottom, left});

    const inv = math.inv(coeficientMatrix);
    const r = math.cross(inv, constantMatrix);

    console.log(r);

    renderMatrix($("#coeficientMatrix"), coeficientMatrix);
    renderMatrix($("#constantMatrix"), constantMatrix, {vertical: true});
    renderMatrix($("#finalMatrix"), finalMatrix, {withRounding: true});

    matrixIndexes(finalMatrix, function(x, y) {
      console.log(getNodeByIndexes(finalMatrix, x, y));
    });
    //renderHeatmap(createHeatmap, finalMatrix, screenSize);
  });

});