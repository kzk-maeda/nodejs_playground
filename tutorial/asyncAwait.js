'use strict'

function parseJSONAsync(json) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(json))
      } catch (error) {
        reject(error)
      }
    }, 1000)
  })
}

async function asyncFunc(json) {
  try {
    const result = await parseJSONAsync(json)
    console.log('Parse Result: ', result)
  } catch (error) {
    console.log('Caught Error: ', error)
  }
}

console.log('====== Creating Promise Instance ======')
console.log(asyncFunc('{"Key": "Value"}'))
console.log(asyncFunc('illegalValue'))

setTimeout(() => {
  console.log('====== After 1 second ======')
}, 1000)