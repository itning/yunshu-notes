<template>
  <el-container>
    <note-list @selectNote="onSelectNote" :noteId="noteId"/>
    <editor :selectNote="selectNote"/>
  </el-container>
</template>

<script>
  import NoteList from './NoteList'
  import Editor from './Editor'

  export default {
    name: "Note",
    props: ['noteId'],
    data() {
      return {
        selectNote: ''
      }
    },
    components: {NoteList, Editor},
    methods: {
      onSelectNote(id) {
        this.selectNote = id;
      }
    }
  }

</script>

<style scoped>

</style>
