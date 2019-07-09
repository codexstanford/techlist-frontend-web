const formatCategory = str => {
  if (str.toUpperCase() != str) {
    const newStr = str.toUpperCase().replace(' ', '_');

    return newStr;
  } else {
    const newStr = str
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, ' ')
      .replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });

    return newStr;
  }
};

export default formatCategory;
