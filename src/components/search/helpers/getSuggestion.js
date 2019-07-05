import deburr from 'lodash/deburr';

export function getSuggestions({ value, data }) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : data.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.name &&
          suggestion.name[0].payload.slice(0, inputLength).toLowerCase() ===
            inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}
