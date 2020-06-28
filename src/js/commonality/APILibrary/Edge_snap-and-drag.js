function Edge_snap_and_drag (oDiv) {
  oDiv.onmousedown = function (ev) {
    var oEvent = ev || event
    var disX = oEvent.clientX - oDiv.offsetLeft
    var disY = oEvent.clientY - oDiv.offsetTop
    /*
        clientX:表示鼠标在浏览器中x轴的位置
        offsetTop:相对于上一级的定位元素的偏移量
        以鼠标和对象的左上角为标的正方形
        */
    if (oDiv.setCapture) {
      oDiv.onmousemove = mouseMove
      oDiv.onmouseup = mouseUp

      oDiv.setCapture()
    } else {
      document.onmousemove = mouseMove
      document.onmouseup = mouseUp
    }

    function mouseMove (ev) {
      var oEvent = ev || event
      var l = oEvent.clientX - disX
      var t = oEvent.clientY - disY
      var rightLine = document.documentElement.clientWidth - oDiv.offsetWidth
      var bottomLine = document.documentElement.clientHeight - oDiv.offsetHeight

      if (l < 50) {
        l = 0
      } else if (l > rightLine - 50) {
        l = rightLine
      }
      if (t < 50) {
        t = 0
      } else if (t > bottomLine - 50) {
        t = bottomLine
      }

      oDiv.style.cursor = 'move'
      oDiv.style.left = l + 'px'
      oDiv.style.top = t + 'px'
    };

    function mouseUp () {
      this.onmousemove = null
      this.onmouseup = null

      oDiv.style.cursor = 'pointer'
      if (oDiv.releaseCapture) {
        oDiv.releaseCapture()
      }
    };

    return false
  }
}
