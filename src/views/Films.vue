<!--
 * @Author: your name
 * @Date: 2020-04-22 02:50:54
 * @LastEditTime: 2020-04-22 03:42:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\views\Films.vue
 -->
<template>
<div>
<!-- <filmlayout :FilmPathTree="this.FilmPathTree[0]" ></filmlayout> -->
asd
</div>
</template>

 
<script>
import FilmLayout from '@/components/Film/FilmLayout/FilmLayout.vue'
export default {
    name: 'Films',
    data: function () {
        return {

        }
    },
    computed: {
        FilmPathTree() {
            let data = [];
            if (this.$store.state.FilmPath.data===undefined) {
                console.log('Fims.vue :: Get The Root Path is Empty,Nothing in there');
            } 
            else if(this.$store.state.FilmPath.data.length>=1){
            this.$store.state.FilmPath.data.forEach((item, index) => {
                if (item != null) {
                    data.push({
                        Tree: new this.Tree(item),
                        TreeRootName: item
                    });
                }
            });
            }
            
            return data;
        }
    },
    components:{
        filmlayout:FilmLayout
    },
    mounted(){
        console.log(new this.File().FileTree(this.FilmPathTree[0].TreeRootName,this.FilmPathTree[0].Tree));
    },
    created(){
      /**监视文件夹 */
    // this.$store.state.FilmPath.data.forEach((item, index) => {
    //     let options = {
    //         persistent: true,
    //         ignored: /(^|[\/\\])\../,
    //         cwd: '.',
    //         depth: 0
    //     }
    //     if (item != null) {
    //         chokidar.watch(item, options).on('all', (event, path) => {
    //             console.log(event, path);
    //         })
    //     }
    // })
  }
  

}
</script>

 
<style>
 </style>
