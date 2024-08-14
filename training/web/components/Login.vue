<template>
    <div class="loginBody">
        <div class="loginDiv">
            <div class="login-content">
                <h1 class="login-title">运输管理系统</h1>
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
                        <!-- 在按钮外面包裹一个 div，并设置 margin-right 属性来创建间距 -->
                        <div style="margin-right: 200px;"> <!-- 间距为20px，你可以根据需要调整 -->
                            <el-button type="primary" @click="confirm" :disabled="confirm_disable">登录</el-button>
                        </div>
                        <el-button type="danger" @click="register" :disabled="register_disable">注册</el-button>
                    </el-form-item>


                </el-form>
            </div>
        </div>





        <!-- Dialog对话框 Dialog 弹出一个对话框
     model-value / v-model	是否显示 Dialog	boolean 
     centerDialogVisible  新增dialog是否可见-->
        <el-dialog v-model="registerDialogVisible" title="注册" width="500" center :before-close="handleClose">
            <!-- 新增表单 
             form动态关联
             model	表单数据对象	rules	表单验证规则-->
            <el-form ref="registerform" :rules="registerrules" :model="registerform" label-width="auto"
                style="max-width: 600px">
                <!-- 账号 -->
                <el-form-item label="账号" style="width: 60%;" prop="no">
                    <el-input v-model="registerform.no" />
                </el-form-item>

                <!-- 名字 -->
                <el-form-item label="名字" style="width: 60%;" prop="name">
                    <el-input v-model="registerform.name" />
                </el-form-item>

                <!-- 密码 -->
                <el-form-item label="密码" style="width: 60%;" prop="password">
                    <el-input v-model="registerform.password" />
                </el-form-item>

                <!-- 年龄 -->
                <el-form-item label="年龄" style="width: 60%;" prop="age">
                    <el-input v-model="registerform.age" />
                </el-form-item>
                <!-- 性别 -->
                <el-form-item label="性别">
                    <el-radio-group v-model="registerform.sex">
                        <el-radio value="0">男</el-radio>
                        <el-radio value="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 电话 -->
                <el-form-item label="电话" style="width: 60%;" prop="phone">
                    <el-input v-model="registerform.phone" />
                </el-form-item>

            </el-form>

            <!-- 插槽footer	Dialog 按钮操作区的内容 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="registerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="save">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>


    </div>


</template>


<script>
export default {
    name: "Login",
    data() {

        //校验年龄 checkAge
        let checkAge = (rule, value, callback) => {
            if (value > 150) {
                callback(new Error('年龄输入过大'));
            }
            else {
                callback();
            }
        };

        // 校验账号的唯一性 checkDuplicate 
        let checkDuplicate = (rule, value, callback) => {
            if (this.registerform.id) {
                return callback();
            }

            this.$http.get("/user/findByNo?no=" + this.registerform.no).then(res => res.data)
                .then(res => {
                    if (res.code != 200) {
                        callback();
                    }
                    else {
                        callback(new Error('账号已存在'));
                    }
                })
        };
        return {
            registerDialogVisible: false,
            confirm_disable: false,
            register_disable: false,
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
            },
            //注册校验规则
            registerrules: {
                no: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur' },
                    { validator: checkDuplicate, trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入名字', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                    { min: 1, max: 3, message: '长度在 1 到 3个位', trigger: 'blur' },
                    { pattern: /^([1-9][0-9]*){1,3}$/, message: '年龄必须为正整数', trigger: "blur" },
                    { validator: checkAge, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号不能为空', trigger: "blur" },
                    { pattern: /^2[3|4|5|6|7|8|9][0-9]\d{3}$/, message: "请输入正确的手机号", trigger: "blur" }
                ]

            },
            //注册表单
            registerform: {
                id: '',
                no: '',
                name: '',
                password: '',
                age: '',
                phone: '',
                sex: '0',
                roleId: '2'
            }
        }
    },
    methods: {
        //对话框关闭判定
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        //重置表单
        resetForm() {
            this.$refs.registerform.resetFields();
        },
        //新增表单提交后端
        save() {
            this.$refs.registerform.validate((valid) => {
                // 校验合法
                if (valid) {
                    //this.form表单数据是dialog数据
                    this.$http.post('user/save', this.registerform).then(res => res.data).then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            this.$message({
                                message: '注册成功!',
                                type: 'success'
                            });
                            this.registerDialogVisible = false
                        }
                        else {
                            this.$message({
                                message: '操作失败!',
                                type: 'error'
                            });
                        }
                    })
                }
                // 校验不合法
                else {
                    this.$message({
                        message: '校验失败 请填写完整数据',
                        type: 'error'
                    });
                    this.register_disable = false;
                    return false;
                }
            });
        },

        //注册下拉dialog
        register() {
            this.registerDialogVisible = true
            this.$nextTick(() => {
                this.resetForm();
            })
        },


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
                            //存储登录者信息
                            //在网页开发中，sessionStorage.setItem 方法是用来在浏览器的会话存储（session storage）中保存数据的。
                            //将一个名为 “LoginUser” 的项保存到浏览器的会话存储中，
                            //该项的值是 res.data 对象经过 JSON.stringify 方法转换成的字符串。

                            // JSON.stringify(res.data) 是一个将 res.data 对象转换成 JSON 字符串的过程。
                            // 因为 sessionStorage 只能存储字符串，所以如果需要保存对象或数组，就需要先将它们转换成字符串。
                            sessionStorage.setItem("LoginUser", JSON.stringify(res.data))
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