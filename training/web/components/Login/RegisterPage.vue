<template>
    <div class="register-page">
        <el-card class="register-card" shadow="always">
            <h1 class="title">用户注册</h1>
            <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px">
                <el-form-item label="账号" prop="no">
                    <el-input v-model="registerForm.no" autocomplete="off" />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerForm.password" autocomplete="off" />
                </el-form-item>

                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="registerForm.confirmPassword" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <div class="button-group">
                        <el-button type="primary" @click="register" class="register-button">注册</el-button>
                        <el-button @click="goBack" class="back-button">返回</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                no: '',
                password: '',
                confirmPassword: '',
                roleId: '1',
                age: 18
            },
            rules: {
                no: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
                    { validator: this.checkDuplicate, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' },
                    { validator: this.checkPasswordStrength, trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator: this.checkConfirmPassword, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        checkDuplicate(rule, value, callback) {
            if (!value) {
                return callback(new Error('请输入账号'));
            }

            this.$http.get(`/user/findByNo?no=${value}`).then(res => res.data).then(res => {
                if (res.code === 200) {
                    callback(new Error('账号已存在'));
                } else {
                    callback();
                }
            }).catch(() => callback(new Error('验证失败')));
        },
        checkPasswordStrength(rule, value, callback) {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);

            if (hasUpperCase && hasLowerCase) {
                callback();
            } else {
                callback(new Error('密码必须包含大小写字母'));
            }
        },
        checkConfirmPassword(rule, value, callback) {
            if (value !== this.registerForm.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        },
        register() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    const { confirmPassword, ...data } = this.registerForm;
                    this.$http.post('user/save', data).then(res => res.data).then(res => {
                        if (res.code === 200) {
                            this.$message({
                                message: '注册成功!',
                                type: 'success'
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message({
                                message: '操作失败!',
                                type: 'error'
                            });
                        }
                    }).catch(() => {
                        this.$message({
                            message: '请求失败，请稍后重试。',
                            type: 'error'
                        });
                    });
                } else {
                    this.$message({
                        message: '校验失败，请填写完整数据',
                        type: 'error'
                    });
                }
            });
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5;
    margin: 0;
}

.register-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    font-weight: bold;
}

.el-form-item {
    margin-bottom: 15px;
}

.el-input {
    font-size: 14px;
}

.button-group {
    display: flex;
    justify-content: space-between;
}

.register-button,
.back-button {
    width: 48%;
    padding: 10px 0;
    font-size: 14px;
    border-radius: 4px;
}

.register-button {
    background-color: #409EFF;
    border-color: #409EFF;
    color: #fff;
}

.back-button {
    background-color: #dcdcdc;
    border-color: #dcdcdc;
    color: #333;
}

.register-button:hover,
.back-button:hover {
    opacity: 0.9;
}

.el-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
