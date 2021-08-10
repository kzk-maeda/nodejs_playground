'use strict'

const http = require('http')
const fibonacci = require('./fibonacci')

// サーバーオブジェクトの生成とリクエストハンドラの設定
http.createServer((req, res) => {
  // http://localhost:3000/10へのリクエストではreq.urlは `/10` になるので、
  // 先頭の一文字目 (`/`) を取り除いて n を取得する
  const n = Number(req.url.substr(1))
  console.log(`INFO: get number ${n}`)
  if (Number.isNaN(n)) {
    // n が数値でなかった場合は終了
    return res.end()
  }

  const result = fibonacci(n)
  // 計算結果をレスポンスとして返す
  res.end(result.toString())
}).listen(3000) // 3000ポートでリクエストを待機