/*
 * @Author: your name
 * @Date: 2020-04-13 16:37:34
 * @LastEditTime: 2020-04-13 20:28:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\js\test\DataStructure\worker.js
 */

// import { parse } from 'path'
// import path from 'path'
//


// Listen to messages from parent thread

function asd(a,b){

}

self.addEventListener('message', (event) => {
  console.log('Worker received message:', event.data)
  // Do some calculations and send the result back to parent thread
//   let parsedPath = parse('C:/test')
  self.postMessage({'result': 'parsedPath'})
})
