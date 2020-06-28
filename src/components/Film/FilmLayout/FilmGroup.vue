<!--
 * @Author: your name
 * @Date: 2020-03-24 07:27:06
 * @LastEditTime: 2020-04-22 01:40:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\components\Film\FilmLayout\FilmGroup.vue
 -->
<template lang="html">
     <details class="p-1">
        <summary class="single-line">{{groupname}}</summary>
        <b-row>
          <b-col class="size" v-for="index in 7" :key="index"></b-col>
        </b-row>
        <slot></slot>
    </details>

</template>

<script>
export default {
  name: 'FilmGroup',
  data: function() {
    return {

    }
  },
  props: {
    groupname: {
      type: String,
      default: '组名'
    }
  }
}
</script>

<style lang="css" scoped>
details summary {
    -webkit-touch-callout:none;    /*iOS Safari*/
    -webkit-user-select:none;    /*Chrome/Safari/Opera*/
    -khtml-user-select:none;    /*Konqueror*/
    -moz-user-select:none;    /*Firefox*/
    -ms-user-select:none;    /*internet Explorer/Edge*/
    user-select: none;    /*Non-prefixed version ,currently*/
    outline: 0;
}

details summary.single-line{
    cursor: default;
}
details summary.single-line::-webkit-details-marker{
    visibility: hidden;
}
.size {
    width: 200px;
    height: 180px;
    border: 1px solid black;
}
</style>
