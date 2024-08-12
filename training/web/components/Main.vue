<template>
    <div>
        <!-- 列表查询 -->
        <!-- Input 输入框
         model-value / v-model	绑定值 
         v-model="name" v-model="sex"监控输入框
         输入传入data return 再传入loadpost中的param
         @change  enter键触发-->
        <div style="margin-bottom: 5px;">
            <el-input v-model="name" placeholder="请输入名字" suffix-icon="Search" style="width: 200px;"
                @change="loadPost"></el-input>

            <!-- Select 选择器​
            当选项过多时，使用下拉菜单展示并选择内容。 -->
            <el-select v-model="sex" filterable placeholder="请选择性别" suffix-icon="User"
                style="width: 200px;margin-left: 5px ;">
                <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <!-- 调用loadPost查询  
            传入参数根据v-model="name" v-model="sex"中的name sex返回后端进行 -->
            <el-button type="primary" style="margin-left: 5px ;" @click="loadPost">查询</el-button>
            <el-button type="success" @click="resetParam">重置</el-button>
            <!-- add函数只是激发dialog对话框 展示新增表单 -->
            <el-button type="danger" @click="add">新增</el-button>
        </div>

        <!-- data数据来源于tableData 
     header-cell-style	 设置背景表头单元格的 style 的回调方法，
     也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
     border边框-->
        <el-table :data="tableData" :header-cell-style="{ background: '#f2f5fc', color: '#555555' }" border>
            <!-- prop后的值需跟数据库字段名匹配 -->
            <el-table-column prop="id" label="Id" width="60" />
            <el-table-column prop="no" label="账号" width="160" />
            <el-table-column prop="name" label="姓名" width="160" />
            <el-table-column prop="age" label="年龄" width="160" />
            <el-table-column prop="sex" label="性别" width="160">



                <!-- 插槽default 
                 自定义列的内容-->
                <template #default="scope">
                    <!-- el-tag用于标记和选择 -->
                    <!-- type	Tag 的类型 
                 disable-transitions	是否禁用渐变动画	false-->
                    <!-- :type展示图标形状颜色，差值表达式展示文字信息 -->
                    <el-tag :type="scope.row.sex === 1 ? 'primary' : 'success'" disable-transition>{{ scope.row.sex ===
                        1 ?
                        '女' :
                        '男'
                        }}</el-tag>
                </template>


            </el-table-column>
            <el-table-column prop="roleId" label="角色" width="160">


                <!-- 展示角色 -->
                <template #default="scope">
                    <!-- :type展示图标形状颜色，差值表达式展示文字信息 -->
                    <el-tag :type="scope.row.roleId === 0 ? 'danger' : (scope.row.roleId === 1 ? 'primary' : 'warning')"
                        disable-transition>{{ scope.row.roleId === 0 ? '超级管理员' :
                            (scope.row.roleId === 1 ? '管理员' : '用户') }}</el-tag>
                </template>

            </el-table-column>
            <el-table-column prop="phone" label="电话" width="160" />
            <el-table-column prop="operate" label="操作" width="165">


                <template #default="scope">
                    <!-- el-button按钮 -->
                    <el-button size="small" type="primary">编辑</el-button>
                    <!-- Popconfirm 气泡确认框 
                     confirm-button-text="确定" 确认文字
                     cancel-button-text="取消"  取消文字-->
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" title="确定删除吗?">
                        <!-- 插槽reference	触发 Popconfirm 显示的 HTML 元素 -->
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>


            </el-table-column>
        </el-table>





        <!-- 分页处理 -->

        <!-- :current-page赋值 pageNum当前页数
         :page-size="pageSize" 每页条数
         @size-change="handleSizeChange"  点击事件改变每页条数
         @current-change="handleCurrentChange" 
        -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
            :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>







        <!-- Dialog对话框 Dialog 弹出一个对话框
     model-value / v-model	是否显示 Dialog	boolean 
     centerDialogVisible  新增dialog是否可见-->
        <el-dialog v-model="centerDialogVisible" title="提示" width="500" center :before-close="handleClose">
            <span>el-dialog对话框</span>
            <!-- 插槽footer	Dialog 按钮操作区的内容 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "Main",
    data() {

        return {
            //列表数据,以数组形式接收
            tableData: [],
            //分页所需赋值数据 
            //pageSize  pageNum total先赋值默认数据
            pageSize: 10,
            pageNum: 1,
            total: 0,
            //input列表查询
            //绑定监控name sex
            name: '',
            sex: '',
            // Select 选择器​当选项过多时，
            // 使用下拉菜单展示并选择内容。
            sexs: [
                {
                    value: '0',
                    label: '男'
                }, {
                    value: '1',
                    label: '女'
                }
            ],
            //新增dialog是否可见
            centerDialogVisible: false,
        }
    },
    methods: {



        //新增,
        add() {
            //展示dialog对话框
            this.centerDialogVisible = true
            this.$nextTick(() => {
                this.resetForm();
            })
        },
        // input查询框重置 将传入的值赋值为空
        resetParam() {
            this.name = '',
                this.sex = ''
        },
        //关于分页函数 handleSizeChange，handleCurrentChange
        //改变每页条数，传值val，将pageSize改为val
        handleSizeChange(val) {
            //默认当前页为1
            this.pageNum = 1
            this.pageSize = val
            this.loadPost()
        },

        //改变当前页数，传值val，将pageNum改为val
        handleCurrentChange(val) {
            this.pageNum = val
            this.loadPost()
        },
        //打印所有信息(user)
        loadGet() {
            //axios实现get请求
            this.$http.get('user/list').then(res => res.data).then(res => {
                // console.log(res);
            })
        },
        // post请求需要传入json的表单数据
        loadPost() {
            //axios实现post请求
            //实现分页查询
            this.$http.post('user/listPage',
                // 传入json形式的请求体 分页传入条数和页数
                {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    //将前端监控的值传给param
                    param: {
                        name: this.name,
                        sex: this.sex
                    }
                }).then(res => res.data).then(res => {
                    // res => res.data过滤后端返回数据包含code，msg，data等
                    console.log(res);
                    // res.code == 200表示后端返回的code数据为200,代表后端操作成功
                    if (res.code == 200) {
                        //tableData列表数据,以数组形式接收
                        //res.data从后端拿到data的数据，只包含data
                        //res.total将后端的条数赋值前端total
                        this.tableData = res.data
                        this.total = res.total
                    }
                    else {
                        alter('获取数据失败')
                    }
                })
        },
    },
    // 1、这是我们遇到的第一个生命周期函数,表示实例完全被创建出来之前,会执行它，
    // 注意:在 beforeCreate 生命周期函数执行的时候, data 和 methods 中的 数据都还没有初始化

    // 3、这是遇到的第三个生命周期函数,表示 模板已经在内存中编辑完成了,但是尚未把模板渲染到 页面中，
    // 在 beforeMount 执行的时候,页面中的元素,还没有被真正替换过来,只是之前写的一些模板字符串
    beforeMount() {
        // 调用loadGet loadPost
        // this.loadGet();
        this.loadPost();
    }
}
</script>

<style></style>