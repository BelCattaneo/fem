function expect(expectedValue, actualValue) {
  if(expectedValue !== actualValue) {
    throw new Error(`expected: ${expectedValue} but received: ${actualValue}`);
  }
}


function test() {
  const value = 5000;

  const {finalMatrix} = diferenciasFinitas(6, {top: value, right: value, bottom: value, left: value})
  matrixIndexes(finalMatrix, (x,y) => {
    const v = getNodeByIndexes(finalMatrix, x, y);
    expect(value, v);
  })
}



test();