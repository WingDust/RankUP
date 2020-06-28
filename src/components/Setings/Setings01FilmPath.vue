<style lang="css" scoped>
</style>

<template lang="html">

<b-container fluid class="noreponsive">
    <b-row>
        <b-col></b-col>
        <b-col>
            <b-button class="float-right mb-3" variant="outline-dark" @click="getFilmPath">请选择并添加储存的视频文件夹路径</b-button>
            <b-table id="filmpath" scriped hover primary-key="index" :items="TableFilmPath" :fields="fields">
                <template v-slot:cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <template v-slot:cell(delete)="data">
                  <b-button v-b-modal.deleteModal @click="deletePath(data.index)" v-model="buttonStats">〤</b-button>
                </template>
            </b-table>
        </b-col>
        <b-col></b-col>
    </b-row>
    <b-modal id="deleteModal" centered hide-footer ref='deleteModal'>
        <p>您是否要删除这一个视频检索库路径</p>
        <!-- <template v-slot:modal-footer="{ok,cancel}">
            <b-button @click="cancel">取消 （Esc）</b-button>
            <b-button @click="ok">确定 （Enter）</b-button>
            @click="hideModal"
        </template> -->
        <b-button class="float-right" @click="ok"  v-model="buttonStats">确定 （Enter）</b-button>
    </b-modal>
    <div class="fixed-top float-right">
        <b-alert :show="dismissCountDown" dismissible variant="secondary" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">您选择了相同地路径
            <br>
            <b>&rArr;</b>（这个警告会在 {{dismissCountDown}} 秒后消失）
        </b-alert>
    </div>
</b-container>

</template>

<script>
import fs from "fs";
import path from "path";
import { read, write, writeSync } from "node-yaml"; //yaml引入未定义
import Yaml from "js-yaml";
import { remote } from "electron";
import { BTable, BModal, BAlert } from "bootstrap-vue";
/**lodash */
import cloneDeep from "lodash/fp/cloneDeep.js"
import isEqual from "lodash/fp/isEqual.js"
import isEmpty from "lodash/fp/isEmpty.js"

export default {
  name: "SetingsFilmPath",
  data: function() {
    return {
      fields: [
        {
          key: "index",
          label: "索引",
          sortable: true
        },
        {
          key: "path",
          label: "路径",
          sortable: true
        },
        {
          key: "description",
          label: "简单描述",
          sortable: false
        },
        {
          key: "delete",
          label: "删除"
        }
      ],
      FilmPath: [],
      deleteIndex: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      buttonStats: 0,
    };
  },
  computed: {
    TableFilmPath: function() {
      let data = [];
      if (Array.isArray(this.FilmPath)) {
        if (this.FilmPath.length != 0) {
          data = this.FilmPath.map(value => {
            return {
              isActive: true,
              path: value,
              description: ""
            };
          });
        }
      }
      return data; //这里涉及一个对于加载来数据进行 改造能适用于列表的数据
    }
  },
  components: {
    "b-table": BTable,
    "b-modal": BModal,
    "b-alert": BAlert
  },
  methods: {
    getFilmPath: function() {
      let that = this;
      let options = {};
      options.title = "请选择视频储存文件夹的路径";
      options.properties = ["openDirectory", "showHiddenFiles"];
      remote.dialog.showOpenDialog(options).then(res => {
        if (res.filePaths[0] == undefined) return;
        let flag = false; //查找FilmPath数组中 对要添加的路径是否有重复项
        // 这里可用 ES6 Set 去重
        if (that.FilmPath.length != 0) {
          that.FilmPath.forEach(item => {
            if (res.filePaths[0] == item) {
              flag = true;
              that.$options.methods.showAlert(that);
            }
          });
        }
        if (!flag) {
          that.FilmPath.push(res.filePaths[0]);
        }
      });
    },
    /**
     * [deletePath description:从显示的列表中获取这行号，这个行号表示要从数组中删除那个元素的下标]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    deletePath: function(index) {
      console.log(index);
      this.deleteIndex = index;
    },
    /**
     * [ok description:确认删除这个数组中的元素]
     * @return {[type]} [description]
     */
    ok: function() {
      this.buttonStats = "disabled";
      this.FilmPath.splice(this.deleteIndex, 1);

      this.$refs["deleteModal"].hide();
    },
    /**--------------------------- */

    countDownChanged: function(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert(that) {
      that.dismissCountDown = that.dismissSecs;
    }
  },
  created: function() {
    if (this.$store.state.FilmPath.data === undefined) {
      console.log('Seting.vue:: The Root Path is load empty');
    }
    else if (this.$store.state.FilmPath.data != undefined) {
      // 这里要实现深克隆
      this.FilmPath = cloneDeep(this.$store.state.FilmPath.data);
    }
  },
  beforeDestroy: function() {
    //保存路径到yaml中
    // let FilmPathdata=this.FilmPath.map((value) => { return value.path})

    /**这个页面中的路径数组 可分为
     * 1. 被删除成空数组
     * 2. 与原加载的数组发生改变
     * 3. 什么都没有做，保留为 undefined
     * 
     * 由于这里我写两条路，我需要做一个确认这两条路都是否完成的信息，当两条路都完成时才有环节的下一步
     */

    /**当为空数组 它会写入成`[]`进 yaml 文件中虽然将不会有对运行有影响，但还是应该写成将文件内容清空*/
    if (isEmpty(this.FilmPath)) {
      let filmpathconfig = path.join(__static, "film.yaml");
      //this.$store.dispatch("addFilmPathSync", this.FilmPath," Seting 空数组传入"); //异步的返回值
      this.$store.dispatch("addFilmPathSync",{'data':this.FilmPath,'description':" Seting 空数组传入"}); //异步的返回值
      fs.writeFile(filmpathconfig,"",function(){console.log('Done');});
    }
    else
    if (this.FilmPath != undefined && !isEqual(this.FilmPath,this.$store.state.FilmPath.data)) {
        console.log(Yaml.dump(this.FilmPath));
        let filmpathconfig = path.join(__static, "film.yaml");
        //this.$store.dispatch("addFilmPathSync", this.FilmPath," Seting 改变的数据传入"); //异步的返回值
        this.$store.dispatch("addFilmPathSync",{ 'data':this.FilmPath,'description':" Seting 改变的数据传入"}); //异步的返回值
        fs.writeFile(
          filmpathconfig,
          Yaml.dump(this.FilmPath),
          {
            flag: "w"
          },
          () => {}
        );
        // write(filmpathconfig,this.FilmPath,'utf8',(err) => {throw err })
    }
  }
};
</script>
