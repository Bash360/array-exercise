/** */
/**
 * method to sort array into object
 * with the color as the key and number of pairs as value
 *
 *
 * @param {array} arr
 * @returns Object
 */
function sortSocks(arr) {
  arr.sort((a, b) => a - b);
  const sortedSocks = {};
  arr.forEach((currentValue) => {
    if (!(currentValue in sortedSocks)) {
      sortedSocks[currentValue] = 1;
    } else {
      sortedSocks[currentValue] += 1;
    }
  });
  return sortedSocks;
}

/**
 *
 *
 * @param {object} obj
 * @returns number
 */
function getCleanPairs(obj) {
  let numberOfCleanSocks = 0;
  for (const key in obj) {
    const pairs = Math.trunc(obj[key] / 2);
    const remainingSocks = (obj[key] % 2);
    if (remainingSocks === 0) {
      numberOfCleanSocks += pairs;
      delete obj[key];
    } else {
      numberOfCleanSocks += pairs;
      obj[key] = remainingSocks;
    }
  }
  return numberOfCleanSocks;
}
/**
 *
 *
 * @param {number} noOfWashes
 * @param {array} cleanPile
 * @param {array} dirtyPile
 * @returns number
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  if (noOfWashes === 0) {
    return getCleanPairs(sortSocks(cleanPile));
  }
  if (noOfWashes >= dirtyPile.length) {
    const pile = [...cleanPile, ...dirtyPile];
    noOfWashes = 0;
    return getCleanPairs(sortSocks(pile));
  }
  let sortedCleanSocks = sortSocks(cleanPile);
  let numberOfCleanSocks = 0;
  numberOfCleanSocks += getCleanPairs(sortedCleanSocks);
  cleanPile = Object.keys(sortedCleanSocks);
  let count = 0;
  const sortedDirtySocks = sortSocks(dirtyPile);
  for (const value of dirtyPile) {
    if (value in sortedCleanSocks && sortedDirtySocks[value] !== 0 && count < noOfWashes) {
      count += 1;
      cleanPile.push(value);
      sortedDirtySocks[value] -= 1;
      sortedCleanSocks = sortSocks(cleanPile);
      numberOfCleanSocks += getCleanPairs(sortedCleanSocks);
      cleanPile = Object.keys(sortedCleanSocks);
    }
  }

  for (const value of dirtyPile) {
    if (value in sortedCleanSocks && sortedDirtySocks[value] !== 0 && count < noOfWashes) {
      count += 1;
      cleanPile.push(value);
      sortedDirtySocks[value] -= 1;
      sortedCleanSocks = sortSocks(cleanPile);
      numberOfCleanSocks += getCleanPairs(sortedCleanSocks);
      cleanPile = Object.keys(sortedCleanSocks);
    } else if (sortedDirtySocks[value] > 1 && count < noOfWashes) {
      count += 1;
      cleanPile.push(value);
      sortedDirtySocks[value] -= 1;
      sortedCleanSocks = sortSocks(cleanPile);
      numberOfCleanSocks += getCleanPairs(sortedCleanSocks);
      cleanPile = Object.keys(sortedCleanSocks);
    } else {
      continue;
    }
  }
  return numberOfCleanSocks;
}
module.exports = getMaxPairs;
