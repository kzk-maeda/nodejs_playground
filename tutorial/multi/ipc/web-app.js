'use strict'
const http = require('http')
const fibonacci = require('../fibonacci')
const pid = process.pid

// IPCでメッセージを受信して指定されたポート番号でWebサーバを起動
process.on('message', port => {
  console.log(pid, `start web server on port ${port}`)
  http.createServer((req, res) => {
    const n = Number(req.url.substr(1))
    if (Number.isNaN(n)) {
      return res.end()
    }
    const response = fibonacci(n)
    // 結果をIPCで送信
    process.send({ pid, response })
    res.end(response.toString())
  }).listen(port)
})