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
            <el-button slot="suffix" type="text" :disabled="!getCode" @click="getVCode">获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <el-input :disabled="!inputCode"></el-input>
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
        login: {
          username: '',
          password: ''
        },
        reg: {
          name: '',
          username: '',
          password: '',
          password2: ''
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
          checkCode: [
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
        //TODO 注册
        this.$refs['reg'].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
          }
        });
      },
      getVCode() {
        this.inputCode = true;
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
