<template>
  <section>
    <el-card v-for="note in notes" :key="note.id" shadow="hover">
      <div>
        <a href="#">
          <h1>{{note.title}}</h1>
          <h5>创建时间:2016-01-02 18:35:42</h5>
          <h5>修改时间:2016-01-02 18:35:42</h5>
        </a>
        <el-button size="mini" type="warning" icon="el-icon-share" circle></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
  import bus from '../assets/eventBus';

  export default {
    name: "NoteList",
    data() {
      return {
        notes: []
      }
    },
    mounted() {
      bus.$on("noteId", function (data) {
        console.log("on-->" + data);
      })
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
