<template>
  <section>
    <router-link to="/">
      <img src="../assets/logo_w_small.png" alt="logo" class="logo_img">
    </router-link>
    <!--下拉菜单-->
    <el-dropdown v-if="show" @command="setFormVisible">
      <span class="logo_info">{{login_info}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command>修改信息</el-dropdown-item>
        <el-dropdown-item command="logout">注销登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-input v-if="show" class="search_input" placeholder="搜索笔记..." prefix-icon="el-icon-search" v-model="search_key"
              clearable>
    </el-input>
    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="昵称">
          <el-input v-model="name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import {USER} from "../api";

  export default {
    name: "ToolBar",
    data() {
      return {
        search_key: '',
        login_info: '舒露 已登陆',
        show: true,
        dialogFormVisible: false,
        name: '舒露',
        password: ''
      }
    },
    methods: {
      setFormVisible(status) {
        if (status === "logout") {
          this.logout();
        } else {
          this.dialogFormVisible = status;
        }
      },
      getLoginUserInfo() {
        this.$axios.get(USER().getLoginUser).then(resp => {
          this.name = resp.data.name;
          this.login_info = resp.data.name + " 已登陆";
        }).catch(error => {

        }).then(() => {

        });
      },
      logout() {
        this.$axios.get(USER().logout).then(resp => {
          window.location.href = "/login";
        }).catch(error => {

        }).then(() => {

        });
      }
    },
    mounted() {
      this.$route.path === '/login' ? this.show = false : this.show = true;
      this.getLoginUserInfo();
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
