<template>
  <el-main v-loading="loading">
    <el-input @change="onTitleChange($event)" style="margin-bottom: 8px" v-model="title" placeholder="标题">
      <template slot="prepend">标题:</template>
    </el-input>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"></quill-editor>
  </el-main>
</template>

<script>
  import bus from '../assets/eventBus';
  import {NOTE} from "../api";

  export default {
    name: "Editor",
    data() {
      return {
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
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        this.contentChange = true;
      },
      onEditorChange({quill, html, text}) {
        console.log("change");
        this.contentChange = !this.contentChange;
        this.content = html
      },
      onTitleChange(value) {
        this.upNote();
      },
      getNote() {
        this.loading = true;
        this.$axios.get(NOTE().getNote + this.note_id).then(resp => {
          this.title = resp.data.title;
          this.content = resp.data.content;
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
      upNote() {
        this.loading = true;
        this.$axios.patch(NOTE().upNote + this.note_id, {content: this.content, title: this.title}).then(resp => {
          this.$message({
            message: '笔记更新成功!',
            type: 'success'
          });
          this.getNote();
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
      }
    },
    mounted() {
      const that = this;
      bus.$on('selectNote', function (id) {
        that.note_id = id;
        that.getNote();
      })
    }
  }
</script>

<style scoped>

</style>
