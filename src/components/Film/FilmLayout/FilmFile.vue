<!--
 * @Author: your name
 * @Date: 2020-03-24 07:27:06
 * @LastEditTime: 2020-04-22 01:18:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\components\Film\FilmLayout\FilmFile.vue
 -->
<template lang="html">
<li>
    <span  >{{model.data}}</span>
    <ul v-show="hasChildren">
        <FilmFile v-for="(child,index) in model.children" :key="index"  :model="child">
        </FilmFile>
    </ul>

</li>
</template>

<script>
export default {
  name: 'FilmFile',
  data: function() {
    return {}
  },
  props: ['model'],
  // watch: {
  //   'model.children': {
  //     handler: function() {
  //       console.log(1);
  //       //this.FilmPathTree[0][Tree].traverseDF(console.log())
  //     },
  //     deep: true,
  //     //immediate:true,
  //   }
  // },
  computed: {
    hasChildren() {
      // return (this.model.children && this.model.children.length > 0) ? true : false
      return this.model.children && this.model.children.length
    }

  },
  created() {
    console.log(this.model);
    // console.log(this.model.children);
    // console.log(this.model.children.length);
    // setTimeout(() => {
    //   console.group();
    //   console.log(this.model);
    //   console.log(this.model.data);
    //   console.log(this.model.children);
    //   console.log(this.model.children.length);
    //   console.log(this.hasChildren);
    //   console.groupEnd();
    //   // console.log(this.model.children[0].toString());

    // }, 1600)
  }
}
</script>

<style lang="css" scoped>
</style>
