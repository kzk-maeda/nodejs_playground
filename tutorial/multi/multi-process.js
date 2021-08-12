'use strict'
const { fork, setupMaster } = require('cluster')

console.log('Main Process : ', process.pid)


// サブプロセスが実行するファイルの指定
setupMaster({ exec: `${__dirname}/web-app` })

// cpuの数だけプロセスをフォーク
const cpuCount = require('os').cpus().length
for (let i = 0; i < cpuCount; i++) {
  const sub = fork()
  console.log('Sub Process : ', sub.process.pid)
}