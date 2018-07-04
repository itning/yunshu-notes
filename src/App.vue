<template>
  <div>
    <el-container :style="{ height: clientHeight, border: '1px solid #eee' }">
      <el-header>
        <tool-bar/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <side-bar/>
        </el-aside>
        <el-aside width="300px">
          <note-list/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import ToolBar from './components/ToolBar'
  import NoteList from './components/NoteList'
  import SideBar from './components/SideBar'

  export default {
    name: 'App',
    components: {ToolBar, NoteList, SideBar},
    data() {
      return {
        clientHeight: '600px'
      }
    },
    mounted() {
      //设置文档可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight - 20}px`;
      const that = this;
      window.onresize = function temp() {
        that.clientHeight = `${document.documentElement.clientHeight - 20}px`;
      };
    }
  }
</script>

<style>
  .el-header {
    background-color: #398dee;
    text-align: left;
    font-size: 12px
  }
</style>
