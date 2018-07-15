<template>
  <el-main v-loading="loading" v-if="noteNotNull">
    <el-input @change="onTitleChange($event)" style="margin-bottom: 8px" v-model="title" placeholder="标题">
      <template slot="prepend">标题:</template>
    </el-input>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"></quill-editor>
  </el-main>
</template>

<script>
  import {NOTE} from "../api";

  export default {
    name: "Editor",
    props: ['selectNote'],
    data() {
      return {
        noteNotNull: true,
        contentChange: false,
        title: '',
        note_id: '',
        loading: true,
        content: '加载中....',
        editorOption: {
          // some quill options
        }
      }
    },
    methods: {
      onEditorBlur(quill) {
        if (this.contentChange) {
          this.contentChange = false;
          this.upNote();
        }
      },
      onEditorChange({quill, html, text}) {
        this.contentChange = true;
        this.content = html
      },
      onTitleChange(value) {
        this.upNote();
      },
      getNote() {
        this.loading = true;
        this.$http.get(NOTE().getNote + this.note_id, {credentials: true}).then(resp => {
          this.title = resp.body.data.title;
          this.content = resp.body.data.content;
          this.loading = false;
        }, response => {
          if (response.status === 401) {
            window.location.href = "/login"
          } else {
            this.$message.error("获取笔记信息失败!");
          }
        });
      },
      upNote() {
        this.loading = true;
        this.$http.patch(NOTE().upNote + this.note_id, {
          content: this.content,
          title: this.title
        }, {credentials: true}).then(resp => {
          this.getNote();
          this.loading = false;
        }, response => {
          if (response.status === 401) {
            window.location.href = "/login"
          } else {
            this.$message.error("修改笔记信息失败!");
          }
        });
      }
    },
    watch: {
      selectNote(now, old) {
        if (now === 0) {
          this.loading = false;
          this.noteNotNull = false;
        } else {
          this.loading = true;
          this.noteNotNull = true;
          this.note_id = now;
          this.getNote();
        }
      }
    }
  }
</script>

<style scoped>

</style>
