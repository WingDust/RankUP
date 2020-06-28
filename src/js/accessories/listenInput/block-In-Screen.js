function VisualArea () {
  let up, down
  let indexBlocks = setBlockIndex()
  let blocks_list_Array = get_blocks_list_Array()
  let Maxlength_list = Math.max(...blocks_list_Array)
  const Visual_TotalHeight = document.documentElement.clientHeight
  const Scroll_Height = window.document.documentElement.scrollTop // 判断是在页面的顶部 0、中间、底部 总高
  // 可视化页面中一列最大能放多少个block还是有三种情况
  if (Scroll_Height == 0) {
    let maxNum = parseInt((Visual_TotalHeight - 20 - 20 - 60 + 10) / 196)
  } else if (Scroll_Height < Visual_TotalHeight) {

  } else if (Scroll_Height == Visual_TotalHeight) {

  }

  if (Srcoll_Height == 0) {

  }
  let Visual_downheight = (entries) => {
    for (let i = Maxlength_list - 1; i > -1; i--) {
      if (entries[i].isIntersecting) {
        return down = i
      }
      return down = -1
    }
  }
  let Visual_upheight = (entries) => {
    for (let i = 0; i < Maxlength_list; i++) {
      if (entries[i].isIntersecting) {
        return up = i
      }
      return up = -1
    }
  }

  function Get (entries, Visual_upheight, Visual_downheight) {}

  const io = new IntersectionObserver((entries) => {
    Get(entries, Visual_downheight(entries), Visual_upheight(entries))
    io.disconnect()
    return Visual_UpDown = new Array(up, down)
  })

  for (let i = 0; i < Maxlength_list; i++) {
    io.observe(
      indexBlocks[blocks_list_Array.indexOf(Maxlength_list)][i]
    )
  }
}
