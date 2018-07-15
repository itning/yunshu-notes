<template>
  <el-tabs type="border-card" :style="{margin: cardHeight}" stretch>
    <el-tab-pane label="登陆">
      <el-form :model="login" ref="login" label-position="left" :rules="rules" status-icon label-width="55px">
        <el-form-item label="邮箱" prop="username">
          <el-input v-model="login.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="login.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="form_login">立即登陆</el-button>
          <el-button type="text">忘记密码?</el-button>
        </el-form-item>
        <el-form-item>
          <span>第三方平台登录 : </span>
          <el-button type="text">QQ登陆</el-button>
          <el-button type="text">微信登陆</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="注册">
      <el-form :model="reg" ref="reg" label-position="left" status-icon :rules="rules" label-width="80px">
        <el-form-item label="邮箱" prop="username">
          <el-input v-model="reg.username">
            <el-button slot="suffix" type="text" :disabled="!getCode" @click="getVCode">{{code_msg}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="reg.code" :disabled="!inputCode"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="reg.name" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="reg.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="reg.password2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="form_reg">立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {USER} from "../api";

  export default {
    name: "Login",
    props: ['clientHeight'],
    data() {
      let validatePass = (rule, value, callback) => {
        if (this.reg.password2 !== this.reg.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        getCode: false,
        inputCode: false,
        code_msg: '获取验证码',
        login: {
          username: '',
          password: ''
        },
        reg: {
          name: '',
          username: '',
          password: '',
          password2: '',
          code: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入邮箱账号'},
            {type: "email", message: '邮箱格式不正确'}
          ],
          password: [
            {required: true, message: '请输入密码'},
          ],
          password2: [
            {required: true, message: '请再次输入密码'},
            {validator: validatePass, trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入昵称'}
          ],
          code: [
            {required: true, message: '请输入验证码'}
          ]
        }
      }
    },
    methods: {
      form_login() {
        this.$refs['login'].validate((valid) => {
          //判断验证是否全部通过
          if (valid) {
            //POST REQUEST
            this.$http.post(USER().login, {
              "username": this.login.username,
              "password": this.login.password
            }, {emulateJSON: true, credentials: true})
              .then(response => {
                //status is 200 login success
                if (response.body.status === 200) {
                  localStorage.setItem("login_name", response.body.data.name);
                  window.location = "/"
                } else {
                  //密码错误,用户不存在
                  this.$message({
                    showClose: true,
                    message: response.body.msg,
                    type: 'warning'
                  });
                }
              }, response => {
                //server error
                this.$notify.error({
                  title: 'Sorry',
                  message: '服务器开小差了,请稍后再试'
                });
              });
          }
        });
      },
      form_reg() {
        this.$refs['reg'].validate((valid) => {
          if (valid) {
            this.$http.post(USER().registered, {
              name: this.reg.name,
              username: this.reg.username,
              password: this.reg.password,
              code: this.reg.code
            }, {emulateJSON: true, credentials: true}).then(response => {
              this.$notify({
                title: '成功',
                message: '注册成功!',
                type: 'success'
              });
            }, response => {
              this.$message({
                showClose: true,
                message: '验证码不正确',
                type: 'error'
              });
            });
          }
        });
      },
      getVCode() {
        this.getCode = false;
        this.code_msg = "重新获取";
        this.$http.get(USER().getCode + "?email=" + this.reg.username, {credentials: true}).then(response => {
          this.$message({
            message: '验证码已经成功发送!',
            type: 'success'
          });
          this.inputCode = true;
          this.getCode = true;
        }, response => {
          if (response.status === 406) {
            this.$message({
              showClose: true,
              type: 'error',
              duration: 0,
              message: '该邮箱已经被注册!'
            });
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              duration: 0,
              message: '邮件发送失败!'
            });
          }
          this.getCode = true;
        });
      }
    },
    watch: {
      'reg.username'() {
        const that = this;
        this.$refs['reg'].$on('validate', function (prop, status) {
          status ? that.getCode = true : that.getCode = false;
        })
      }
    },
    computed: {
      cardHeight: function () {
        return Number.parseInt(this.clientHeight.substring(0, this.clientHeight.indexOf('px'))) / 2 - 300 + 'px auto';
      }
    }
  }
</script>

<style scoped>
  .el-form {
    padding: 40px;
    width: 500px;
  }
</style>
