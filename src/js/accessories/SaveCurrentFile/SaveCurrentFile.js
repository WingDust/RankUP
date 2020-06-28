/*
还需对当时编写的与上一次保存的文件，比较弹出未保存的弹窗，需要一个内部缓存的机制
*/
let currentFilePath = null // 当前文件的保存路径
let isSaved = true
hotkeys('ctrl+s', function (event, handler) {
  SaveCurrentDoc()
})
/*
保存内容致文件
*/
function SaveText (text, file) {
  const fs = require('fs')
  fs.writeFile(file, text, err => {
    if (!err) {
      fs.readFile(file, 'utf8', (err, data) => {
        console.log(data)
      })
    }
  })
}
/*
创建保存文件夹
*/
function SaveToFile () {
  const fs = require('fs')
  currentFilePath[0] = currentFilePath[0] + '\\01'
  fs.mkdir(currentFilePath[0], err => {
    if (!err) console.log('work')
  })
}
/*
保存当前文档
*/
function SaveCurrentDoc () {
  if (!currentFilePath) {
    const options = {}
    options.properties = ['openDirectory', 'showHiddenFiles']
    const file = remote.dialog.showOpenDialog(remote.getCurrentWindow(), options,
      (filePaths) => {
        currentFilePath = filePaths
      }
    )
  }

  if (currentFilePath != null) {
    let indexBlocks = setBlockIndex()
    SaveToFile()
    for (var i = 0; i < indexBlocks.length; i++) {
      for (var j = 0; j < indexBlocks[i].length; j++) {
        const txtTitle = indexBlocks[i][j].children[0].innerText
        const txtSave = indexBlocks[i][j].children[1].innerText
        const block_text = txtTitle + '\n' + txtSave
        SaveText(block_text, currentFilePath[0] + '\\' + i.toString() + ',' + j.toString() + '.txt')
      }
    }
    isSaved = true
  }
}
