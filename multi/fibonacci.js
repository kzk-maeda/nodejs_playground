'use strict'

module.exports = function fibonacci(n) {
  // nが1以下の時はnを、それ以外の場合は直前の2つのフィボナッチ数の和を返す
  return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}