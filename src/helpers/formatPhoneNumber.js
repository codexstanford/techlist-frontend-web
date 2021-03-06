export const formatPhoneNumber = (value, setFieldValue) => {
  var cleaned = ('' + value).replace(/\D/g, '').substring(0, 10);

  if (value.substring(0, 2) === '+1') {
    cleaned = cleaned.substring(1, 10);
  }

  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode =
      match[1] || value.length === 10 || value.length === 11 ? '+1 ' : '';
    // if (setFieldValue) {
    //   // setTimeout(() => {
    //     return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join();
    //   // }, 1000);
    //   // setTimeout(() => {
    //   //   setFieldValue(
    //   //     'phone',
    //   //     [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    //   //   );
    //   // }, 500);
    // }
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return cleaned;
};

export const unformatPhoneNumber = value => {
  const cleanedValue = value.replace(/[\D]/g, '');
  return `+${cleanedValue}`;
};
