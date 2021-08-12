'use strict'
const fibonacci = require('../fibonacci')
// workerDataでInt32Arrayインスタンスを受け取る
const { workerData: int32Array, parentPort } = require('worker_threads')

parentPort.on('message', n => {
  parentPort.postMessage(fibonacci(n))
  // 処理の度に最初の値をインクリメントする
  int32Array[0] += 1
})