'use strict'
const { fork, setupMaster } = require('cluster')

console.log('main process : ', process.pid)

setupMaster({ exec: `${__dirname}/web-app` })

const cpuCount = require('os').cpus().length
for (let i = 0; i < cpuCount; i++) {
  const sub = fork()
  console.log('sub process : ', sub.process.pid)
  // IPCでサブプロセスにポート番号を発信
  sub.send(3000)
  // IPCで受信したメッセージをハンドリング
  sub.on('message', ({pid, response}) => {
    console.log(process.pid, `return response : ${response} from process : ${pid}`)
  })
}