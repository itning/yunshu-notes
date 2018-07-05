<template>
  <section>
    <el-container :style="{ height: clientHeight, border: '1px solid #eee' }">
      <el-header>
        <tool-bar/>
      </el-header>
      <el-container>
        <side-bar/>
        <router-view :clientHeight="clientHeight"/>
      </el-container>
    </el-container>
  </section>
</template>

<script>
  import ToolBar from './components/ToolBar'
  import SideBar from './components/SideBar'

  export default {
    name: 'App',
    components: {ToolBar, SideBar},
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
  a {
    text-decoration: none;
    color: inherit;
  }

  .el-header {
    background-color: #398dee;
    text-align: left;
    font-size: 12px
  }
</style>
