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
      管理者
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

  // 方法
  methods: {
    // 伸缩函数
    collapse() {
      // 传入父组件
      this.$emit('doCollapse')
    },
    //个人中心
    toUser() {
      console.log("touser");
    },
    //退出登录
    logout() {
      console.log("logout");

    }
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
