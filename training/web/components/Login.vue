<template>
    <div class="loginBody">
        <div class="loginDiv">
            <div class="login-content">
                <h1 class="login-title">用户登录</h1>
                <el-form :model="loginForm" label-width="100px" :rules="rules" ref="loginForm">
                    <!-- 账号 -->
                    <el-form-item label="账号" prop="no">
                        <el-input style="" type="text" v-model="loginForm.no" autocomplete="off" size="small" />
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input style="" type="password" v-model="loginForm.password" show-password autocomplete="off"
                            size="small" @change="confirm" />
                    </el-form-item>

                    <el-form-item>
                        <!-- disabled	按钮已禁用 绑定confirm_disable使之不能多次提交 -->
                        <el-button type="primary" @click="confirm" :disabled="confirm_disable">确定</el-button>
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
        }
    },
    methods: {

        confirm() {
            // 确定时不能再次点击 认证失败时则可以
            this.confirm_disable = true;
            // $refs 是Vue中用于访问DOM元素或组件引用的方式。在这里，loginForm 
            // 是一个组件的引用，它可能是一个表单组件，比如Vuetify或Element UI的表单。

            // .validate() 方法是表单组件的一个方法，用于执行表单验证。校验:rules
            // 这个方法接受一个回调函数，
            // 该回调函数的参数 valid 是一个布尔值，表示验证是否通过。
            this.$refs.loginForm.validate((valid) => {

                // 校验合法
                if (valid) {//valid成功为true 失败为false
                    //后台验证用户密码
                    this.$http.post('user/login', this.loginForm).then(res => res.data).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                            this.$message({
                                message: '登陆成功!',
                                type: 'success'
                            });
                            //存储
                            sessionStorage.setItem("CurUser", JSON.stringify(res.data))
                            // sessionStorage.setItem("CurUser", JSON.stringify(res.data.user))
                            // console.log(res.data.user);
                            // console.log(res.data.menu);
                            // this.$store.commit("setMenu", res.data.menu)

                            //跳转到主页
                            this.$router.replace('/Indextest')
                        }
                        else {
                            this.$message({
                                message: '校验失败 用户名或密码错误!',
                                type: 'error'
                            });
                            this.confirm_disable = false;
                            return false;
                        }
                    });
                }


                // 校验不合法
                else {
                    this.$message({
                        message: '校验失败 请输入合法的用户名或密码',
                        type: 'error'
                    });
                    this.confirm_disable = false;
                    return false;
                }
            });

        }
    }
}


</script>


<style scoped>
.loginBody {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #B3C0D1;
    background-image: url("../assets/picture/huoyun.jpg");
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
}

.login-content {
    width: 400px;
    height: 250px;
    position: absolute;
    top: 25px;
    left: 25px;
}
</style>