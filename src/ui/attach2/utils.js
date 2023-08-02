export function truncateFilename(filename, maxFilenameLength) {
  if (maxFilenameLength && filename.length > maxFilenameLength) {
    const lengthOfPart = Math.round(maxFilenameLength / 2) - 1;

    return `${filename.substr(0, lengthOfPart)}…${filename.substr(
      filename.length - lengthOfPart
    )}`;
  }

  return filename;
}

export function pluralize(number, one, two, five) {
  let n = Math.abs(number);

  n %= 100;

  if (n >= 5 && n <= 20) {
    return five;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n >= 2 && n <= 4) {
    return two;
  }

  return five;
}
