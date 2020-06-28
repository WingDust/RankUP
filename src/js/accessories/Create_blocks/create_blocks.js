/*

*/
var js_div = () => {
  let div = document.createElement('div')
  let blocks = document.getElementsByClassName('blocks')[0]
  blocks.appendChild(div)
}
var js_add_blocks_aliveline = () => {
  let blocks_aliveline = document.createElement('div')

  let add_blocks_aliveline = document.createAttribute('class')
  add_blocks_aliveline.value = 'blocks_aliveline'
  blocks_aliveline.setAttributeNode(add_blocks_aliveline)
  let blocks_aliveline_style = document.createAttribute('style')
  blocks_aliveline.setAttributeNode(blocks_aliveline_style)

  let blocks = document.getElementsByClassName('blocks')[0]
  blocks.lastElementChild.appendChild(blocks_aliveline)
}
var js_add_blocks_list_title_container = () => {
  let blocks_list_title_container = document.createElement('div')

  let add_blocks_list_title_container = document.createAttribute('class')
  add_blocks_list_title_container.value = 'blocks_list_title_container'
  blocks_list_title_container.setAttributeNode(add_blocks_list_title_container)
  let blocks_list_title_container_style = document.createAttribute('style')
  blocks_list_title_container.setAttributeNode(blocks_list_title_container_style)

  let blocks = document.getElementsByClassName('blocks')[0]
  blocks.lastElementChild.lastElementChild.appendChild(blocks_list_title_container)
}
var js_add_blocks_list_title = () => {
  let blocks_list_title = document.createElement('input')

  let add_blocks_list_title = document.createAttribute('class')
  add_blocks_list_title.value = 'blocks_list_title'
  blocks_list_title.setAttributeNode(add_blocks_list_title)
  let blocks_list_title_style = document.createAttribute('style')
  blocks_list_title.setAttributeNode(blocks_list_title_style)

  let blocks = document.getElementsByClassName('blocks')[0]
  blocks.lastElementChild.lastElementChild.firstElementChild.appendChild(blocks_list_title)
}
var js_add_blocks_list = () => {
  let blocks_list = document.createElement('div')

  let add_blocks_list = document.createAttribute('class')
  add_blocks_list.value = 'blocks_list'
  blocks_list.setAttributeNode(add_blocks_list)
  let blocks_list_style = document.createAttribute('style')
  blocks_list.setAttributeNode(blocks_list_style)

  let blocks = document.getElementsByClassName('blocks')[0]
  blocks.lastElementChild.lastElementChild.appendChild(blocks_list)
}
// block添加
var js_Create_block = () => {
  let block_div = document.createElement('div')
  let div_attribute = document.createAttribute('class')
  div_attribute.value = 'Block_Show block'
  block_div.setAttributeNode(div_attribute)
  let block_Style = document.createAttribute('style')
  block_div.setAttributeNode(block_Style)
  block_div.setAttribute('contenteditable', 'true')
  //  block_div.setAttribute("-webkit-user-modify", "read-write-plaintext-only");
  let Lastblock = document.getElementsByClassName('blocks')
  Lastblock[0].appendChild(block_div)
  // Lastblock[Lastblock.length - 1].appendChild(block_div);
}
var js_block_container = () => {
  let block_container = document.createElement('div')

  let add_block_container = document.createAttribute('class')
  add_block_container.value = 'block_container'
  block_container.setAttributeNode(add_block_container)
  let block_container_style = document.createAttribute('style')
  block_container.setAttributeNode(block_container_style)
}
/*
生成blocks_list
生成一个默认的block
*/
hotkeys('ctrl+shift+n', function (event, handler) {
  Create_blocks_list()
})

function Create_blocks_list () {
  js_div()
  js_add_blocks_aliveline()
  js_add_blocks_list_title_container()
  js_add_blocks_list_title()
  js_add_blocks_list()
}

/*
生成block
*/
hotkeys('ctrl+n', function (event, handler) {})
