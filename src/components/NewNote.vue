<template>
  <el-container>
    <el-header>
      <div>
        <el-input placeholder="在这里输入笔记的标题..." v-model="aa" style="margin-top: 8px;width: 79%;">
          <template slot="prepend">标题:</template>
        </el-input>
        <el-select v-model="aa" placeholder="选择笔记本">
          <el-option label="笔记本A" value="shanghai"></el-option>
          <el-option label="笔记本B" value="beijing"></el-option>
        </el-select>
      </div>
    </el-header>
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
  export default {
    name: "NewNote",
    data() {
      return {
        aa: '',
        content: '',
        editorOption: {
          // some quill options
        }
      }
    },
    watch: {
      aa: function (n, o) {
        console.log(n);
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({quill, html, text}) {
        console.log('editor change!', quill, html, text);
        this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    }
  }
</script>

<style scoped>

</style>
