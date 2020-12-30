<template>
  <Form ref="loginForm" :model="form" class="login-form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <i-input v-model="form.userName" placeholder="请输入用户名" prefix="ios-person"></i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="form.password" placeholder="请输入密码" prefix="md-lock"></i-input>
    </FormItem>
    <Row>
      <i-col span="12">
        <FormItem prop="kaptcha">
          <i-input type="text" v-model="form.kaptcha" placeholder="请输入验证码（随机输入）" prefix="md-phone-portrait"></i-input>
        </FormItem>
      </i-col>
      <i-col span="11" offset="1">
        <img :src="kaptchaImg" @click="refreshKaptcha" class="kaptchaImg" />
      </i-col>
    </Row>
    <FormItem>
      <i-col span="24">
         <Button @click="handleSubmit" class="app-login-btn" long>登录</Button>
      </i-col> 
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入新密码'));
              } else if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
                callback(new Error('请输入6-16位密码'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      }
    },
    kaptchaRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    },
    kaptchaImg: {
      type: String,
    }
  },
  data() {
    return {
      form: {
        userName: 'admin',
        password: '123456',
        kaptcha: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        kaptcha: this.kaptchaRules
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            kaptcha: this.form.kaptcha,
          })
        }
      })
    },
    refreshKaptcha() {
      this.$emit("refreshKaptcha");
    }, 
  }
}
</script>
<style lang="scss" scope>
.login-form {
  .ivu-form-item {
    margin-bottom: 30px;
  }
  .ivu-input {
    height: 44px;
    line-height: 44px;
    color: #34334b;
    font-size: 14px;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #e8e7ef;
    box-shadow: none;
    &:focus {
      background: transparent;
      border-color: #0DA7FF;
    }
  }
  .ivu-form-item-error {
    .ivu-input {
      border-color: #0DA7FF;
      &:focus {
        box-shadow: none;
        border-color: #0DA7FF;
      }
    }
  }
  .ivu-input-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 25px;
      color: #e8e7ef;
    }
  }
  .ivu-form-item-error-tip {
    height: 30px;
    line-height: 30px;
    padding: 0;
  }
  .app-login-btn {
    height: 60px;
    background: #0DA7FF;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
  }
  .kaptchaImg {
    height: 64px;
    cursor: pointer;
  }
}
</style>
