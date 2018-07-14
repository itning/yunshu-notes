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
        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteNote(note.id)"></el-button>
      </div>
    </el-card>
  </el-aside>
</template>

<script>
  import dayjs from 'dayjs'
  import {NOTE} from "../api";

  export default {
    name: "NoteList",
    props: ['noteId'],
    data() {
      return {
        notes: [],
        loading: true,
      }
    },
    methods: {
      getNoteList(id) {
        this.loading = true;
        this.$http.get(NOTE().getNotes + id, {credentials: true}).then(resp => {
          //如果该笔记本下有笔记
          if (resp.body.dataList.length !== 0) {
            resp.body.dataList.map(note => {
              note.gmtCreate = dayjs(note.gmtCreate).format("YYYY年MM月DD日 HH:mm:ss");
              note.gmtModified = dayjs(note.gmtModified).format("YYYY年MM月DD日 HH:mm:ss");
              return note;
            });
            this.notes = resp.body.dataList;
            this.getNote(resp.body.dataList[0].id);
          } else {
            this.notes = [];
            this.getNote(0);
          }
          this.loading = false;
        }, response => {
          if (response.status === 401) {
            window.location.href = "/login"
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              duration: 0,
              message: '获取笔记信息失败!'
            });
          }
        });
      },
      deleteNote(id) {
        this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(NOTE().delNote + id, {credentials: true}).then(response => {
            this.$message({
              message: '笔记已经成功删除',
              type: 'success'
            });
            this.getNoteList(this.noteId);
          }, response => {
            if (response.status === 401) {
              window.location.href = "/login"
            } else {
              this.$message({
                showClose: true,
                type: 'error',
                duration: 0,
                message: '删除笔记失败!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getNote(id) {
        this.$emit('selectNote', id);
      }
    },
    watch: {
      noteId(now, old) {
        if (now === 0) {
          this.getNote(0);
          this.loading = false;
        } else {
          this.getNoteList(now);
        }
      }
    },
    mounted() {
      if (this.noteId !== '') {
        if (this.noteId === 0) {
          this.loading = false;
        } else {
          this.getNoteList(this.noteId);
        }
      }
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
