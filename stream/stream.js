'use strict'

const fs = require('fs');
const stream = require('stream');

/*
  Read Stream
*/
const readStream = fs.createReadStream('src.txt')
readStream
  // readable event listener の登録
  .on('readable', () => {
    console.log('readable')
    let chunk
    // read all data that is readable currently
    while ((chunk = readStream.read()) != null) {
      console.log(`chunk: ${chunk.toString()}`)
    }
  })
  // register end event listener
  .on('end', () => console.log('end'))


// create self reading stream
class HelloReadableStream extends stream.Readable {
  constructor(options) {
    super(options)
    this.languages = ['JavaStript', 'Python', 'Java', 'C#']
  }

  _read(size) {
    console.log('_read()')
    let language
    while ((language = this.languages.shift())) { // shift: delete first item from List and shift index number and return deleted value
      if (!this.push(`Hello ${language}!\n`)) {
        console.log('cancel reading')
        return
      }
    }
    console.log('complete reading')
    this.push(null)
  }
}

const helloReadableStream = new HelloReadableStream()
helloReadableStream
  .on('readable', () => {
    console.log('readable')
    let chunk
    while ((chunk = helloReadableStream.read()) != null) {
      console.log(`chunk: ${chunk.toString()}`)
    }
  })
  .on('end', () => console.log('end'))


/*
  Write Stream
*/
const fileWritreStream = fs.createWriteStream('dest.txt')
fileWritreStream.write('Hello fron write stream!\n')
fileWritreStream.write('This is test message!\n')
fileWritreStream.write(`date(unixtime): ${Date.now()}`)
fileWritreStream.end()
fs.readFileSync('dest.txt', 'utf8')