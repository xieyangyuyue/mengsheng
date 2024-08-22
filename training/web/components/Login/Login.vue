<template>
    <div class="loginBody">
        <div class="loginDiv">
            <div class="login-content">
                <h1 class="login-title">运输管理系统</h1>
                <el-form :model="loginForm" label-width="100px" :rules="rules" ref="loginForm">
                    <!-- 账号 -->
                    <el-form-item label="账号" prop="no">
                        <el-input type="text" v-model="loginForm.no" autocomplete="off" size="small" />
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" show-password autocomplete="off"
                            size="small" @change="confirm" />
                    </el-form-item>

                    <el-form-item>
                        <div class="button-group">
                            <el-button type="primary" @click="confirm" :disabled="confirm_disable">登录</el-button>
                            <el-button type="danger" @click="navigateToRegister">注册</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            confirm_disable: false,
            loginForm: {
                no: '',
                password: ''
            },
            rules: {
                no: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        };
    },
    methods: {
        navigateToRegister() {
            this.$router.push('/register');
        },
        confirm() {
            this.confirm_disable = true;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$http.post('user/login', this.loginForm).then(res => res.data).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                message: '登陆成功!',
                                type: 'success'
                            });
                            sessionStorage.setItem("LoginUser", JSON.stringify(res.data.user));
                            this.$store.commit("setMenu", res.data.menu);
                            this.$router.replace('/Indextest');
                        } else {
                            this.$message({
                                message: '校验失败 用户名或密码错误!',
                                type: 'error'
                            });
                            this.confirm_disable = false;
                        }
                    });
                } else {
                    this.$message({
                        message: '校验失败 请输入合法的用户名或密码',
                        type: 'error'
                    });
                    this.confirm_disable = false;
                }
            });
        }
    }
};
</script>


<style scoped>
.loginBody {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #B3C0D1;
    background-image: url("../../assets/picture/huoyun.jpg");
    background-size: cover;
    background-repeat: no-repeat;
}

.loginDiv {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -250px;
    width: 450px;
    height: 330px;
    /* background: #fff; */
    border-radius: 5%;
}

.login-title {
    margin: 20px 0;
    text-align: center;
    margin-left: 110px;
}

.login-content {
    width: 400px;
    height: 250px;
    position: absolute;
    top: 25px;
    left: 25px;
}
</style>