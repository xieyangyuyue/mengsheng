<template>
    <el-container style="height:100%; border: 1px solid #eee">
        <!-- :width="aside_width"    width变量  aside_width边框宽度( data return)  -->
        <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246);height: 100%; margin-left: -1px;">
            <el-scrollbar>
                <!-- :isCollapse="isCollapse"前面为变量,返回个aside界面  后者双引号,为值 -->
                <Aside :isCollapse="isCollapse"></Aside>
            </el-scrollbar>
        </el-aside>

        <el-container style="height:100%;">
            <el-header
                style="text-align: right; font-size: 12px;height: 100%;border-bottom: rgba(168, 168, 168, 0.3) 1px solid;">
                <div class="toolbar">
                    <!-- 接收Header传来的doCollapse,用于左侧导航栏伸缩
             @doCollapse的名字对应this.$emit('doCollapse')才能调用 
            -->
                    <Header @doCollapse="doCollapse"></Header>
                </div>
            </el-header>

            <el-main style="height:100%;">
                <el-scrollbar>
                    <!-- <Main></Main> -->
                    <router-view></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>

</template>



<script>
import Aside from './Aside.vue';
import Header from './Header.vue';
import Main from './Main.vue';
export default {
    name: "Indextest",
    // components: { Aside, Header },
    components: { Aside, Header, Main },
    data() {
        return {
            isCollapse: false,
            aside_width: '200px'
        }
    },

    methods: {
        doCollapse() {
            // 点击之后,isCollapse取反,将值传到<Aside :isCollapse="isCollapse"></Aside> 
            // 后面引号值写到 return中,this.isCollapse

            this.isCollapse = !this.isCollapse
            // isCollapse默认false
            if (!this.isCollapse) {//展开
                this.aside_width = '200px'
            }
            else {//收起
                this.aside_width = '64px'
            }
        }
    }

};
</script>

<style scoped>
.el-header {
    /* 头部颜色 */
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 60px;
}
</style>