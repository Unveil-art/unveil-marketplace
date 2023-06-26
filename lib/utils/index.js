export const getUserName = (user) => {
  if (user?.firstName && user?.lastName) {
    return user.firstName + " " + user.lastName;
  } else if (user?.firstName) {
    return user.firstName;
  } else if (user?.email) {
    return user.email;
  } else {
    return "Unveil User";
  }
};

export const getPattern = (length) => {
  switch (length) {
    case 9:
      return [3, 2, 3, 1];
    case 8:
      return [3, 2, 3];
    case 7:
      return [3, 1, 2, 1];
    case 6:
      return [3, 1, 2];
    case 5:
      return [3, 2];
    case 4:
      return [3, 1];
    case 3:
      return [3];
    case 2:
      return [2];
    case 1:
      return [1];
    default:
      return [length];
  }
};

export const splitArrayByPattern = (arr, variant) => {
  let pattern;

  if (arr.length < 9) {
    // If the array length is less than 9, always use pattern 1
    pattern = getPattern(arr.length);
  } else {
    // Otherwise, select the pattern based on the variant
    const patterns = [
      getPattern(arr.length),
      [3, 1, 3, 2],
      [1, 3, 2, 3],
      [2, 3, 1, 3],
    ];
    pattern = patterns[variant - 1];
  }

  let subArrays = [];
  let currentIndex = 0;

  for (const count of pattern) {
    const slice = arr.slice(currentIndex, currentIndex + count);
    subArrays.push(slice);
    currentIndex += count;
  }

  return subArrays;
};