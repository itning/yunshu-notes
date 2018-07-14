<template>
  <el-container>
    <el-header>
      <div style="text-align: center;">
        <el-input placeholder="在这里输入笔记的标题..." v-model="title" style="margin-top: 8px;width: 68%;">
          <template slot="prepend">标题:</template>
        </el-input>
        <el-select v-model="noteBookId" placeholder="选择笔记本" style="width: 20%">
          <el-option v-for="noteBook in noteBookList" :key="noteBook.id" :label="noteBook.name"
                     :value="noteBook.id"></el-option>
        </el-select>
        <el-button @click="saveNote" type="primary" plain style="width: 10%">保存</el-button>
      </div>
    </el-header>
    <el-main>
      <quill-editor v-model="content" :options="editorOption"></quill-editor>
    </el-main>
  </el-container>
</template>

<script>
  import {NOTE, NOTE_BOOK} from "../api";

  export default {
    name: "NewNote",
    data() {
      return {
        title: '',
        noteBookList: [],
        noteBookId: '',
        content: '',
        editorOption: {
          // some quill options
        }
      }
    },
    methods: {
      getNoteBookList() {
        this.$http.get(NOTE_BOOK().getNoteBook, {credentials: true}).then(response => {
          this.noteBookList = response.body.dataList;
        }, response => {
          if (response.status === 401) {
            window.location.href = "/login"
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              duration: 0,
              message: '获取笔记本列表失败!'
            });
          }
        });
      },
      saveNote() {
        if (this.title !== '' && this.noteBookId !== '' && this.content !== '') {
          this.$http.post(NOTE().newNote, {
            title: this.title,
            noteBookId: this.noteBookId,
            content: this.content
          }, {emulateJSON: true, credentials: true}).then(response => {
            this.$message({
              message: '笔记已经成功保存',
              type: 'success'
            });
            this.$router.push({path: '/'})
          }, response => {
            if (response.status === 401) {
              window.location.href = "/login"
            } else {
              this.getNoteBookList();
              this.$message({
                showClose: true,
                type: 'error',
                duration: 0,
                message: '保存失败!'
              });
            }
          });
        } else {
          this.$message({
            message: '笔记标题,笔记本,内容都不能空着哦',
            type: 'warning'
          });
        }
      }
    },
    mounted() {
      this.getNoteBookList();
    }
  }
</script>

<style scoped>

</style>
