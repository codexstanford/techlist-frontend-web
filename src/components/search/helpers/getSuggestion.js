import deburr from 'lodash/deburr';

export function getSuggestions({ value, data }) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : data.filter(suggestion => {
        let keep;
        if (
          count < 5 &&
          !suggestion.person &&
          suggestion.name &&
          suggestion.name[0].payload.slice(0, inputLength).toLowerCase() ===
            inputValue
        ) {
          keep = true;
        } else if (
          count < 5 &&
          suggestion.person &&
          suggestion.person.name &&
          `${suggestion.person.name[0].firstName} ${suggestion.person.name[0].lastName}`
            .slice(0, inputLength)
            .toLowerCase() === inputValue
        ) {
          keep = true;
        }

        if (keep) {
          count += 1;
        }

        return keep;
      });
}
