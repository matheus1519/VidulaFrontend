export const VideoDTO = originalMatrix => {
  const newMatrix = [[], [], []];

  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      newMatrix[row][column] = {};
    }
  }

  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      if (typeof originalMatrix[row][column]?.id === 'number') {
        newMatrix[row][column].id = originalMatrix[row][column].id;
        newMatrix[row][column].name = originalMatrix[row][column].name;
        newMatrix[row][column].url = originalMatrix[row][column].url;
      }
    }
  }

  return newMatrix;
};
