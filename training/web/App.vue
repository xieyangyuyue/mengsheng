<template>
  <div id="app">
    <!-- 路由默认跳转 -->
    <!-- <Indextest></Indextest> -->
    <router-view></router-view>
  </div>
</template>


<script>
import Indextest from './components/Indextest.vue';
export default {
  name: 'App',
  components: {
    Indextest
  }
}
</script>


<style>
#app {
  height: 100%;
}
</style>