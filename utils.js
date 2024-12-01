function splitPairs(arr) {
  return arr.reduce(([leftAcc, rightAcc], [key, value]) => {
    return [
      [...leftAcc, key],
      [...rightAcc, value],
    ];
  }, [[], []]);
}

function transpose(arr) {
  return arr[0].map((col, i) => arr.map(row => row[i]));
}

export {
  splitPairs,
  transpose,
};
