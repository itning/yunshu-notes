<template>
  <section>
    <img src="../assets/logo_w_small.png" alt="logo" class="logo_img">
    <!--下拉菜单-->
    <el-dropdown v-if="show">
      <span class="logo_info">{{login_info}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>注销登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-input v-if="show" class="search_input" placeholder="搜索笔记..." prefix-icon="el-icon-search" v-model="search_key"
              clearable>
    </el-input>
  </section>
</template>

<script>
  export default {
    name: "ToolBar",
    data() {
      return {
        search_key: '',
        login_info: '舒露 已登陆',
        show: true
      }
    },
    mounted() {
      this.$route.path === '/login' ? this.show = false : this.show = true;
    }
  }
</script>

<style scoped>
  .logo_img {
    margin-top: 5px;
  }

  .logo_info {
    color: white;
  }

  .search_input {
    float: right;
    width: auto;
    line-height: 60px;
  }
</style>
