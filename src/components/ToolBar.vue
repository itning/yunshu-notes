<template>
  <section>
    <img src="../assets/logo_w_small.png" alt="logo" class="logo_img">
    <!--下拉菜单-->
    <el-dropdown>
      <span class="logo_info">舒露 已登陆</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>注销登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-input class="search_input" placeholder="搜索..." prefix-icon="el-icon-search" v-model="search_key" clearable>
    </el-input>
  </section>
</template>

<script>
  export default {
    name: "ToolBar",
    data() {
      return {
        search_key: ''
      }
    },
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
