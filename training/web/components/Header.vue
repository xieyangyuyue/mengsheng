<template>
  <div class="app-header">
    <div class="header-left">
      <!-- @click="collapse"创建伸缩函数 -->
      <el-icon style="font-size: 20px; cursor: pointer;" @click="collapse">
        <Fold />
      </el-icon>
    </div>
    <div class="header-center">
      <h1>欢迎来到运输管理系统</h1>
    </div>
    <span class="user-dropdown">
      {{ user.name }}
    </span>
    <div class="header-right">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <!-- 图标 -->
        <el-icon style="margin-left: 5px;margin-top: 22px;">
          <user />
        </el-icon>
        <!-- 下拉选项 -->
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 绑定点击事件 -->
            <el-dropdown-item @click="toUser">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      // JSON.parse() 方法就是用于这个目的，它接受一个 JSON 字符串并将其转换回 JavaScript 对象。
      user: JSON.parse(sessionStorage.getItem('LoginUser'))
    }
  },
  // 方法
  methods: {
    // 伸缩函数
    collapse() {
      // 传入父组件
      this.$emit('doCollapse')
    },
    //个人中心
    toUser() {
      this.$router.push('/Home')
    },
    //退出登录
    logout() {
      console.log("logout");
      // 实现退出登录的逻辑
      this.$confirm('你确定要退出登录', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        center: true,
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出登录成功'
        })
        // 跳转登陆界面
        this.$router.push('/')
        //清空对话数据
        sessionStorage.clear()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出登录'
        })
      })
    },

  },
  create() {
    this.$router.push("/Home")
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
}

.header-left .el-button {
  font-size: 20px;
}

.header-center {
  flex: 1;
  text-align: center;
}

.header-right .user-dropdown {
  cursor: pointer;
}
</style>
