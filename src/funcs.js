function firstLetterCapitalize(stringOriginal) {
  let strings = stringOriginal.split(' ');
  strings = strings.map(str => str[0].toUpperCase() + str.slice(1));
  const string = strings.join(' ');
  return string;
}

export default firstLetterCapitalize;
