<template>
  <el-container>
    <note-list/>
    <editor/>
  </el-container>
</template>

<script>
  import NoteList from './NoteList'
  import Editor from './Editor'

  export default {
    name: "Note",
    components: {NoteList, Editor}
  }

</script>

<style scoped>

</style>
