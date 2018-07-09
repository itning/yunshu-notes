<template>
  <el-container v-loading="loading">
    <el-aside width="300px">
      <note-list/>
    </el-aside>
    <el-main>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"></quill-editor>
    </el-main>
  </el-container>
</template>

<script>
  import bus from '../assets/eventBus';
  import NoteList from './NoteList'
  import {NOTE} from "../api";

  export default {
    name: "Note",
    components: {NoteList},
    data() {
      return {
        contentChange: false,
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
        console.log('editor ready!', quill)
      },
      onEditorChange({quill, html, text}) {
        this.contentChange = true;
        this.content = html
      },
      getNote() {
        this.loading = true;
        this.$axios.get(NOTE().getNote + this.note_id).then(resp => {
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
        this.$axios.patch(NOTE().upNote + this.note_id, {content: this.content}).then(resp => {
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
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
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
