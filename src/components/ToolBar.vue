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
        <el-button type="primary" @click="changeUserProfile">确 定</el-button>
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
        login_info: '',
        show: true,
        dialogFormVisible: false,
        name: '',
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
        if (localStorage.getItem("login_name") !== null) {
          this.name = localStorage.getItem("login_name");
          this.login_info = localStorage.getItem("login_name") + " 已登陆";
        }
      },
      logout() {
        this.$http.get(USER().logout, {credentials: true}).then(response => {
          localStorage.removeItem("login_name");
          window.location.href = "/login";
        }, response => {
          if (response.status === 401) {
            window.location.href = "/login"
          } else {
            //server error
            this.$notify.error({
              title: 'Sorry',
              message: '服务器开小差了,请稍后再试'
            });
          }
        });
      },
      changeUserProfile() {
        if (this.name === '') {
          this.$message.error('昵称不能为空');
        } else {
          this.$http.post(USER().changeUserProfile, {
            id: localStorage.getItem("login_id"),
            name: this.name,
            password: this.password
          }, {emulateJSON: true, credentials: true}).then(response => {
            if (response.body.status === 200) {
              this.$message.success('修改成功');
              localStorage.setItem("login_name", response.body.data.name);
              this.getLoginUserInfo();
              this.dialogFormVisible = false;
            } else {
              this.$message.error('修改失败');
            }
          }, response => {
            this.$message.error('修改失败');
          });
        }
      }
    },
    mounted() {
      if (this.$route.path === '/login') {
        this.show = false;
      } else {
        this.getLoginUserInfo();
        this.show = true;
      }
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
