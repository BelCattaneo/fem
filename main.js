const screenSize = 600;


function totalNodes(totalElements) {
  if(totalElements === 1) {
    return 4
  } else {
    return 2 + totalNodes(totalElements - 1);
  }
}


$(document).ready(function() {

  const heatmap = h337.create({
    container: $(".heatmap")[0]
  });


  heatmap.setData({
    max: 100,
    data: [
      { x: 0, y: 0 , value: 100},
      { x: 20, y: 0 , value: 100},
      { x: 1859, y: 0 , value: 100},
      { x: 1859, y: 0 , value: 100},
      { x: 1859, y: 0 , value: 100}
    ]
  });

});