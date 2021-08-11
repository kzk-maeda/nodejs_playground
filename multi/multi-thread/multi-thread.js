'use strict'
const { Worker, threadId } = require('worker_threads')

console.log('main thread', threadId)

// CPUコアの数だけスレッドを起動
const cpuCount = require('os').cpus().length
for ( let i = 0; i < cpuCount; i++ ) {
  // Sub Threadで実行するファイルのパスを指定してWorkerをnew
  const worker = new Worker(`${__dirname}/web-app.js`)
  console.log('sub thread', worker.threadId)
}