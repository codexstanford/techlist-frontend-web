const formatCategory = str => {
  if (str.toUpperCase() !== str) {
    return str.toUpperCase().replace(/ /g, '_');
  } else {
    return str
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, ' ')
      .replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });
  }
};

export default formatCategory;
