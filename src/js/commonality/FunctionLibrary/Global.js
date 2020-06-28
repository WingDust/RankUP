/* ----------------------------分割线——Start------------------------------ */
/**
 * [get_blocks_list_Array description]
 * @return {[Array]} [用于获取当前页面中所有的每一列block数量的数组]
 */
var get_blocks_list_Array = () => {
  let blocks_list_Array = new Array()
  let blocks_list = document.getElementsByClassName('blocks_list')
  for (var i = 0; i < blocks_list.length; i++) {
    blocks_list_Array.push(blocks_list[i].childElementCount)
  }
  return blocks_list_Array
}
/* ----------------------------分割线——End------------------------------ */

/* ----------------------------分割线——Start------------------------------ */
/**
 * [indexBlocks description]
 * @type {Array}
 * @return {Array} 设置block的索引
 * */

function setBlockIndex () {
  let indexBlocks = new Array()
  let total_txtContent = document.getElementsByClassName('block_container')
  let blocks_list_Array = get_blocks_list_Array()
  let blocks_list_flag = 0
  for (var i = 0; i < blocks_list_Array.length; i++) {
    indexBlocks[i] = new Array()
    for (var j = 0; j < 1; j++) {
      indexBlocks[i][j] = 0
    }
  }

  for (var i = 0; i < blocks_list_Array.length; i++) {
    for (var j = 0; j < blocks_list_Array[i]; j++) {
      indexBlocks[i][j] = total_txtContent[blocks_list_flag + j]
    }
    blocks_list_flag = j
  }
  return indexBlocks
  console.log(indexBlocks)
}
/* ----------------------------分割线——End------------------------------ */
