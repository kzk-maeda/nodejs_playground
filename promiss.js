'use strict'

function parseJSONAsync(json) {
   // return Promise instance(pending)
   return new Promise((resolve, reject) => {
     setTimeout(() => {
       try {
         // fullfilled
         resolve(JSON.parse(json))
       } catch (error) {
         // rejected
         reject(error)
       }
     }, 1000)
   })
}

const toBeFullfilled = parseJSONAsync('{"Key": "Value"}')
const toBeRejected = parseJSONAsync('illegalData')

console.log('====== create Promise Instance ======')
console.log(toBeFullfilled)
console.log(toBeRejected)

setTimeout(() => {
  console.log('====== after 1 second ======')
  console.log(toBeFullfilled)
  console.log(toBeRejected)
}, 1000)
