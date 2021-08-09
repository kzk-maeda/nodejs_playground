'use strict'
const EventEmitter = require('events');

function createFizzBuzzEventEmitter(until) {
  console.log('function createFizzBuzzEventEmitter started')
  const eventEmitter = new EventEmitter
  process.nextTick(() => _emitFizzBuzz(eventEmitter, until)) // EventEmitterインスタンス生成処理の中で同期的にイベントを発行してはいけない
  console.log('returning event emitter instance') // 先にこっちが処理される
  return eventEmitter
}

async function _emitFizzBuzz(eventEmitter, until) {
  eventEmitter.emit('start')
  // console.log('**start event emited')
  let count = 1
  while (count <= until) {
    await new Promise(resolve => setTimeout(resolve, 500)) // これを実行するまでasync functionは待ち状態
    console.log(count)
    if (count % 15 === 0) {
      eventEmitter.emit('FizzBuzz', count) // ③'FizzBuzzというevent名でcountを引数に取るeventを発行する
      // console.log('**FizzBuzz event emited')
    } else if (count % 3 === 0) {
      eventEmitter.emit('Fizz', count)
      // console.log('**Fizz event emited')
    } else if (count % 5 === 0) {
      eventEmitter.emit('Buzz', count)
      // console.log('**Buzz event emited')
    }
    count += 1
  }
  eventEmitter.emit('end')
  // console.log('**end event emited')
}

function startListener() {
  console.log('start')
}

function fizzListener(count) {
  console.log('Fizz', count)
}
function buzzListener(count) {
  console.log('Buzz', count)
}

function fizzBuzzListener(count){
  // ②リスナの実態、イベント名とcountを出力する
  console.log('FizzBuzz', count)
}

function endListener() {
  console.log('end')
  this
  // 使い終わったListenerを登録解除しないとメモリリークの危険性がある
  .off('start', startListener)
  .off('Fizz', fizzListener)
  .off('Buzz', buzzListener)
  .off('FizzBuzz', fizzBuzzListener)
  .off('end', endListener)
}

// createFizzBuzzEventEmitter(40) // ここでEventEmitterインスタンスが帰り、下でリスナを登録する
//   .on('start', startListener)
//   .on('Fizz', fizzListener)
//   .on('Buzz', buzzListener)
//   .on('FizzBuzz', fizzBuzzListener) // ①'FizzBuzz'というevent名でfizzBuzzListenerを登録する
//   .on('end', endListener)


// EventEmitter Classを継承する実装パターン
class FizzBuzzEventEmitter extends EventEmitter {
  async start(until) {
    this.emit('start')
    let count = 1
    while (true) {
      console.log(count)
      if (count % 15 === 0) {
        this.emit('FizzBuzz', count)
      } else if (count % 3 === 0) {
        this.emit('Fizz', count)
      } else if (count % 5 === 0) {
        this.emit('Buzz', count)
      }
      count += 1
      if (count >= until) {
        break
      }
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    this.emit('end')
  }
}

new FizzBuzzEventEmitter()
  .on('start', startListener)
  .on('Fizz', fizzListener)
  .on('Buzz', buzzListener)
  .on('FizzBuzz', fizzBuzzListener) // ①'FizzBuzz'というevent名でfizzBuzzListenerを登録する
  .on('end', endListener)
  .start(20)