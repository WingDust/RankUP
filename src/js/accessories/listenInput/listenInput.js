var esc_times = 1
var cursorPostionstart = 0
var cursorPostionend = null
const currentLine = ''
var keycode // 解决中文输入法的229问题
var x, y, NewTextNode

/* 完成闭包的工作
动态添加键盘监听事件
*/
function a () {
  let active_Element = document.activeElement
  if (active_Element.classList.contains('block')) {
    active_Element.addEventListener('keypress', PreventInput, false) // 是否捕获（布尔值），默认是false，即不捕获，那就是冒泡。
    active_Element.addEventListener('keydown', ReturnNormal, false) // 第一个执行
    active_Element.addEventListener('compositionend', PreventChineseInput, false)
    active_Element.addEventListener('compositionstart', GetCurserPosition, false)
    active_Element.addEventListener('input', PreventKeyCode, false) // 第三个执行
  }
}
/* ----------------------------分割线——Start------------------------------ */
/*
用来判断进入是否命令行的模式
并执行添加输入框 */
const GetSelectionPosition = () => {
  GetCurserLocation()
  MoveCommandLineInput()
}
/* ----------------------------分割线——End------------------------------ */

/* ----------------------------分割线——Start------------------------------ */
/* 获取输入光标的位置 */
const GetCurserLocation = () => {
  getSelectionCoords()
}
/* ----------------------------分割线——End------------------------------ */

/* 动态设置命令行输入框的位置
并focus它 */
const MoveCommandLineInput = () => {
  let commandLineInput = document.getElementsByClassName('commandLineInput')[0]

  commandLineInput.style.display = 'block'
  commandLineInput.style.left = x + 'px'
  commandLineInput.style.top = (y - 25) + 'px'
  setTimeout(function () {
    commandLineInput.focus()
  }, 30)
}
/* ----------------------------分割线——End------------------------------ */

/* ----------------------------分割线——End------------------------------ */

const PreventKeyCode = (e) => {
  console.log(1)
  if (keycode == 229 && esc_times == 2) {
    SetTextNode()
    NewTextNode.deleteData(cursorPostionstart, cursorPostionend - cursorPostionstart)
    if ((e.data == ':' && e.inputType == 'insertText') || (e.data == '：' && e.inputType == 'insertText')) GetSelectionPosition()
    let selection = getSelection()
    let range = selection.getRangeAt(0)
    textNode = range.startContainer
    range.setStart(textNode, cursorPostionstart)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  } else if (false) {}
}
/*
返回切换模式响应
*/
function ReturnNormal (e) {
  console.log(2)
  console.log('rn' + e.keyCode)
  keycode = e.keyCode
  VisualArea()
  if (keycode == 27 && (esc_times == 1 || esc_times == 3)) {
    esc_times = 2
  } else if (keycode == 65 && esc_times == 2) {
    esc_times = 3
  } else if (((keycode >= 48 && keycode <= 123)) && esc_times == 2) {
    e.preventDefault()
  } else if (keycode == 9 && (esc_times == 1 || esc_times == 3)) {
    e.preventDefault()
    let textNode = getSelection().getRangeAt(0)
    let tabNode = document.createTextNode('\u00a0\u00a0\u00a0\u00a0')
    textNode.insertNode(tabNode)
  } else if (keycode == 229 && esc_times == 2) {
    cursorPostionstart = window.getSelection().anchorOffset
  } else {
    e.stopPropagation()
  }
}
/*
阻止字符输入
*/
function PreventInput (evt) {
  console.log(3)
  console.log('pi' + evt.keyCode)
  const charcode = evt.charCode
  if (charcode == 58 && esc_times == 2) {
    evt.preventDefault()
    GetSelectionPosition()
  } else if ((charcode >= 32 || charcode <= 255) && esc_times == 2) {
    evt.preventDefault()
  } else if (charcode == 97 && esc_times == 3) {
    esc_times = 1
    evt.preventDefault()
  }
}
/*
阻止中文输入法输入
*/
function PreventChineseInput (e) {
  console.log(4)
  cursorPostionend = window.getSelection().anchorOffset
  console.log('pci' + e.data)
  if (esc_times == 2) {
    SetTextNode()
    window.getSelection().focusNode.deleteData(cursorPostionstart, cursorPostionend - cursorPostionstart)
    let selection = getSelection()
    let range = selection.getRangeAt(0)
    textNode = range.startContainer
    range.setStart(textNode, cursorPostionstart)
    range.collapse(true)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

function GetCurserPosition (e) {
  console.log(5)
  cursorPostionstart = window.getSelection().anchorOffset
  console.log('gcp' + e.data)
  if (esc_times == 2) {
    if (e.data.substring(0, 1) == ':') {
      let VisualArea = Visual_UpDown
    }
  }
}

/* ----------------------------分割线——Start------------------------------ */
/*
检测是否是文本节点，并设置
*/
const SetTextNode = () => {
  if (window.getSelection().anchorNode.nodeName != '#text') {
    NewTextNode = document.createTextNode(window.getSelection().anchorNode)
  } else {
    NewTextNode = window.getSelection().anchorNode
  }
  cursorPostionend = window.getSelection().anchorOffset
}
/* ----------------------------分割线——End------------------------------ */

/* ----------------------------分割线——Start------------------------------ */
function getSelectionCoords (win) {
  win = win || window
  var doc = win.document
  var sel = doc.selection
  var range; var rects; var rect
  if (sel) {
    if (sel.type != 'Control') {
      range = sel.createRange()
      range.collapse(true)
      x = range.boundingLeft
      y = range.boundingTop
    }
  } else if (win.getSelection) {
    sel = win.getSelection()
    if (sel.rangeCount) {
      range = sel.getRangeAt(0).cloneRange()
      if (range.getClientRects) {
        range.collapse(true)
        rects = range.getClientRects()
        if (rects.length > 0) {
          rect = rects[0]
        }
        // 光标在行首时，rect为undefined
        if (rect) {
          x = rect.left
          y = rect.top
        }
      }
      // Fall back to inserting a temporary element
      if ((x == 0 && y == 0) || rect === undefined) {
        var span = doc.createElement('span')
        if (span.getClientRects) {
          // Ensure span has dimensions and position by
          // adding a zero-width space character
          span.appendChild(doc.createTextNode('\u200b'))
          range.insertNode(span)
          rect = span.getClientRects()[0]
          x = rect.left
          y = rect.top
          var spanParent = span.parentNode
          spanParent.removeChild(span)

          // Glue any broken text nodes back together
          spanParent.normalize()
        }
      }
    }
  }
  return {
    x: x,
    y: y
  }
}
/* ----------------------------分割线——End------------------------------ */
