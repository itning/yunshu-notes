<template>
  <el-aside width="300px" v-loading="loading" style="min-height: 100px">
    <el-card v-for="note in notes" :key="note.id" shadow="hover">
      <div>
        <a style="cursor: pointer" @click="getNote(note.id)">
          <h1>{{note.title}}</h1>
          <h5>创建时间:{{note.gmtCreate}}</h5>
          <h5>修改时间:{{note.gmtModified}}</h5>
        </a>
        <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </el-card>
  </el-aside>
</template>

<script>
  import bus from '../assets/eventBus';
  import dayjs from 'dayjs'
  import {NOTE} from "../api";

  export default {
    name: "NoteList",
    props: ['id'],
    data() {
      return {
        notes: [],
        loading: true
      }
    },
    methods: {
      getNoteList(id) {
        this.loading = true;
        this.$axios.get(NOTE().getNotes + id).then(resp => {
          resp.data.map(note => {
            note.gmtCreate = dayjs(note.gmtCreate).format("YYYY年MM月DD日 HH:mm:ss");
            note.gmtModified = dayjs(note.gmtModified).format("YYYY年MM月DD日 HH:mm:ss");
            return note;
          });
          this.notes = resp.data;
          this.getNote(resp.data[0].id);
        }).catch(error => {
          this.$message({
            showClose: true,
            type: 'error',
            duration: 0,
            message: '获取笔记信息失败!'
          });
        }).then(() => {
          this.loading = false;
        });
      },
      getNote(id) {
        bus.$emit('selectNote', id);
      }
    },
    mounted() {
      const that = this;
      bus.$on("noteId", function (data) {
        if (data === 0) {
          that.loading = false;
        } else {
          that.getNoteList(data);

        }
      })
    },
    beforeDestroy() {
      bus.$off("noteId");
      bus.$off("selectNote");
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 18px;
    margin: 5px 0 15px 0;
  }

  h5 {
    font-size: 12px;
    margin: 5px 0 0 0;
  }

  .el-button {
    margin-top: 10px;
  }

  .el-card {
    margin-bottom: 5px;
  }
</style>
