<!--
 * @Author: your name
 * @Date: 2020-03-25 04:55:00
 * @LastEditTime: 2020-05-07 05:16:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\App.vue
 -->
<style lang="less">
#app {

  position: absolute;
  width: 100%;
  height: 100%;
  background:rgba(51, 51, 51, .6);
  // filter: blur(10px);
  z-index: -1;
}
// .background{
//     background:rgba(51, 51, 51, .6);
//   -webkit-filter: blur(10px);
//    -moz-filter: blur(10px);
//     -ms-filter: blur(10px);
//         filter: blur(10px);
//         width: 100%;
//         height: 100%;
// }

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<template>
<div id="app">
  <div id="nav">
    <router-link to="/Films">Films</router-link> |
    <router-link to="/Setings">Setings</router-link> |
    <router-view />
  </div>
</div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {};
  }
};
</script>
