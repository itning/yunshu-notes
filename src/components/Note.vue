<template>
  <el-container>
    <note-list :id="id"/>
    <editor/>
  </el-container>
</template>

<script>
  import NoteList from './NoteList'
  import Editor from './Editor'

  export default {
    name: "Note",
    components: {NoteList, Editor},
    props: ['id'],
  }

</script>

<style scoped>

</style>
