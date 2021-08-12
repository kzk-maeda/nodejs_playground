'use strict'

// anti-pattern
// 非同期処理内でエラーをキャッチできない
function parseJSONAsyncAntiPattern(json, callback) {
  try {
    setTimeout(() => {
      callback(JSON.parse(json))
    }, 1000)
  } catch (error) {
    console.error('caught error: ', error)
  }
}

function parseJSONAsync(json, callback) {
  setTimeout(() => {
    // callback内で起こりうるエラーを適切にハンドリングし、イベントループまで到達させる
    // ことなく呼び出し元に返すことが重要
    try {
      callback(null, JSON.parse(json))
    } catch (error) {
      callback(error)
    }
  }, 1000)
}

const illegalJson = '不正なJSON';
// callbackの規約では、引数の最初にエラーを受け取ることになっている
parseJSONAsync(illegalJson, (err, result) => 
  console.log('result: ', err, result)
)