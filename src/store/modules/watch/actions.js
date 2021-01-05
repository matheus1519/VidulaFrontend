export function addDiscipline(discipline) {
  return {
    type: '@watch/ADD_DISCIPLINE',
    payload: { discipline },
  };
}

export function addVideo(video) {
  return {
    type: '@watch/ADD_VIDEO',
    payload: { video },
  };
}

export function updatePath(path) {
  return {
    type: '@watch/UPDATE_PATH',
    payload: { path },
  };
}
