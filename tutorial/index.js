'use strict'

// setTimeout(
//   () => console.log('1 second past'),
//   1000
// )
// console.log('start');

const arr1 = [0, 1, 2, 3]
const arr2 = arr1.map((e) => {
  console.log(`processing ${e}`);
  return e*10;
})
console.log('Done', arr2)