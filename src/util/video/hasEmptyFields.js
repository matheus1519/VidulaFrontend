export function hasEmptyFields(video) {
  if (
    video.name === '' ||
    video.alternatives.question === '' ||
    video.alternatives.alternative1 === '' ||
    video.alternatives.alternative2 === '' ||
    video.alternatives.alternative3 === '' ||
    video.alternatives.alternative4 === '' ||
    video.alternatives.alternative5 === '' ||
    video.alternatives.rightAlternative === ''
  ) {
    return true;
  }
  return false;
}
