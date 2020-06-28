<!--
 * @Author: your name
 * @Date: 2020-04-22 01:57:52
 * @LastEditTime: 2020-04-22 02:40:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\components\container\DragContainer.vue
 -->
<template>
<div @drag="dropwrapper($event)" @dragover="dropover($event)"></div>
</template>

<script>
import fs from 'fs'
import path from 'path'
export default {
    name: "DragContainer",
    data: function () {
        return {}
    },
    methods: {
        dropwrapper(e) {
            e.preventDefault();
            const files = e.dataTransfer.files;
            fs.rename(
                files[0].path,
                path.dirname(files[0].path) + "\\123.txt", () => {
                    console.log("done");
                }
            );
            if (files) {
                console.log("path", files[0].path);
                // const content = fs.readFileSync(files[0].path)
            }

        },
        dropover(e) {
            e.preventDefault();
        }
    },
}
</script>

<style>

</style>
