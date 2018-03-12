const screenSize = 600;

function renderHeatmap(heatmap, tempMatrix, screenSize){
  heatmap().setData(createHeatmapDataObject(tempMatrix, screenSize));
}

function createHeatmap(){
  return h337.create({
    container: $(".heatmap")[0]
  });
  
}
$(document).ready(function() {
  createHeatmap();
  let size = 8;
  let temperatures = {top: 10, right: 10, bottom: 1, left: 1};
  console.log("Empieza Diferencias Finitas");
  console.time("Termina Diferencias Finitas");
  let tempMatrix = diferenciasFinitas(size, temperatures);
  console.log(tempMatrix);
  console.timeEnd("Termina Diferencias Finitas");
  console.log("Empieza a Dibujar");
  console.time("Termina de Dibujar");
  renderHeatmap(createHeatmap, tempMatrix, screenSize);
  console.timeEnd("Termina de Dibujar");
});