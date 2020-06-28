<!--
 * @Author: your name
 * @Date: 2020-04-25 17:34:32
 * @LastEditTime: 2020-05-09 00:46:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\components\Film\FilmLayout\FilmLayout.vue
 -->
<style lang="css" scoped>


.noreponsive {
    width: 1860px;
    max-width: none !important;
}

</style>

<template lang="html">

<b-container fluid class="noreponsive">
             <FilmFile :model="FilmPathTree[0]['Tree']._root" v-if="flag"></FilmFile> 
    <filmgroup :groupname="this.FilmPathTree.TreeRootName" open></filmgroup>
</b-container>

</template>

<script>
import fs from "fs";
import path from "path";
import FilmGroup from "@/components/Film/FilmLayout/FilmGroup.vue";
import worker from "worker-loader!../../../js/test/DataStructure/worker.js"
import child_process from 'child_process'

export default {
  name: "FilmLayout",
  data: function() {
    return {
      flag: false,
      a: 0,
      b: 0,
      callbackFlag: false,
      c: [],
      checkline: [],
      cacheline: []
    };
  },
  components: {
    filmgroup: FilmGroup,
    FilmFile: () =>
      import ("@/components/Film/FilmLayout/FilmFile.vue")
  },
  computed: {
  },
  methods: {
    /**
     * [fsReadDir description: 异步的读取传入的路径下的后一层路径，并返回一个]
     * @param  {[type]} dir [description]
     * @return {[type]} Array [description]
     */
    fsReadDir(dir) {
      return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
          //异步
          if (err) {
            reject(err);
          }
          resolve(files);
        });
      });
    },

  /**
   * [fsStat description: 对传入的路径进行异步的文件、文件夹，信息读取，并返回一个，包含信息的Stat对象]
   * @param  {[type]} path [description]
   * @return {[stat]}      [description]
   */
    fsStat(path) {
      return new Promise((resolve, reject) => {
        fs.stat(path, (err, stat) => {
          if (err) {
            reject(err);
          }
          // console.log(stat);
          resolve(stat);
        });
      });
    },


/**
 * [fileSearch description: ]
 * @param  {[type]}   dirPath  [description]
 * @param  {[type]}   Tree     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
    async fileSearch(dirPath, Tree, callback) {
      //一个为当前要检查的路径 一个为当前要检查的路径所生成的节点的子路径数组
      console.log(dirPath);
      const files = await this.fsReadDir(dirPath); //查找到每一个传入路径的子路径的文件名
      files.forEach((item, index) => {
        //将每一个文件转成子路径，判断它是否是文件,并且它是否还是视频文件，都为真：什么都不做 假：表示它是目录，添加到树中
        fs.statSync(path.join(dirPath, item)).isFile() &&
          !this.getFileType(item) ? console.log() : Tree.add(path.join(dirPath, item), dirPath, Tree.traverseBF);
      });
      const promises = files.map(file => {
        return this.fsStat(path.join(dirPath, file));
      });
       console.log(promises);
      // datas 中 两个数组，一个stats 映射一个file 它的顺序是由数组自身的排序决定的
      const datas = await Promise.all(promises).then(stats => {
        for (let i = 0; i < files.length; i++) {
          files[i] = path.join(dirPath, files[i]);
        }
        return {
          stats,
          files
        };
      });
      console.log(datas);
      datas.stats.forEach(stat => {
        if (stat.isDirectory()) {
          //这个目录有文件 则还需要递归
          let data = {};
          data.dir = datas.files[datas.stats.indexOf(stat)];
          data.state = false;
          this.cacheline.push(data);
        }
      });
      console.log(this.cacheline);
      if (this.checkline.length != 0) {
        console.log(this.checkline);
        for (let index = 0; index < this.checkline.length; index++) {
          let flag = true;
          for (let i = 0; i < this.checkline[index].length; i++) {
            if (this.checkline[index][i].state == false) {
              flag = false;
            }
          }
          if (flag == true) {
            if (this.cacheline.length == 0) {
              return (this.flag = true);
            }
            this.checkline.push(this.cacheline);
            console.log(this.checkline);
            this.cacheline = [];
          }

          if (this.checkline[index].indexOf(dirPath)) {
            this.checkline[index].find(value => {
              //  console.log(value);
              if (value.dir == dirPath) {
               return  value.state = true;
              }
            });
          }
        }
      }
      if (this.checkline.length == 0) {
        this.checkline.push(this.cacheline);
        console.log(this.checkline);
        this.cacheline = [];
      }
      // console.log(datas);
      datas.stats.forEach(stat => {
        console.log((this.b += 1) + " b"); //总的运行次数
        const isFile = stat.isFile();
        const isDir = stat.isDirectory();
        if (isDir) {
          this.fileSearch(
            datas.files[datas.stats.indexOf(stat)],
            Tree,
            callback
          );
          console.log((this.a += 1) + " a"); //每一个目录都会+1 可以用来记录文件夹总数
          console.log("\n");
        }
        if (isFile) {
          //添加一个判断是否为视频文件，根据文件的后缀名
          console.log(datas.files[datas.stats.indexOf(stat)]);
          console.log("\n");
        }
      });
    },
    /**
     * [getFileType description: 检查文件是否为视频文件,是：返回 true 否：返回 false]
     * @param  {[type]} name [description]
     * @return {[BOOL]}      [description]
     */
    getFileType(name) {
      let videosuffix = [
        "avi",
        "wmv",
        "mkv",
        "mp4",
        "mov",
        "rm",
        "3gp",
        "flv",
        "mpg",
        "rmvb"
      ];
      //let imagesuffix = ["gif", "jpeg", "jpg", "bmp", "webp", "png"]

      if (
        RegExp(".(" + videosuffix.join("|") + ")$", "i").test(
          name.toLowerCase()
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    setThumbnail(directory) {

      let ThumbnailPath = path.join(__static,"..\\thumbnail")
      let run ="python .\\src\\python\\picture.py"+" "+"\"G:\\Feature film\\非洲女王号.BD1280高清中英双字.mp4\""+" "+ThumbnailPath
      console.log(run);
      let python = child_process.exec(run,{encoding:'arraybuffer'})
      const decoder=new TextDecoder('gbk')

      python.stdout.on('data',function(data){
      console.log(typeof(data));

      console.log(decoder.decode(data));
      })
      python.stderr.on('data',function(data){
      console.log(decoder.decode(data));
      })

      python.on('close',function(code){
      console.log(code);
      })
      
    }

},
  created() {
  },
  props:{
    FilmPathTree:Object,
  },
  mounted() {
    this.fileSearch(
      this.FilmPathTree.TreeRootName,
      this.FilmPathTree.Tree
    );
    console.log(process.env);

    setTimeout(() => {
      console.group();
      console.table(this.FilmPathTree);
      console.groupEnd();
    }, 1500);
    let worker1=worker()

    // let worker = new Worker(path.join(__static,'../src/js/test/worker.js'))
    worker1.postMessage({data:'dedicated worker'})
    worker1.onmessage = function(event){
      console.log(2,event.data);
      worker1.terminate() //关闭worker,避免浪费资源
    }
    worker1.onerror = function (event){
      console.log('error',event);
    }

  },
  watch: {
    flag: function(val) {
      console.log(this.flag);
      this.FilmPathTree[0]['Tree'].traverseBF(this.setThumbnail)
    }
  },
}
</script>
