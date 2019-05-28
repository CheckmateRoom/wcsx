<template>
    <div class="contain">
        <div class="btn">
            <el-button type="primary" @click="addNew()">新增分类</el-button>
        </div>
        <div class="item">
            <div class="items" v-for="(v,k) in kindsList" :key="k">
                <el-input placeholder="请输入内容" v-model="arr[k]" readonly>
                    <template slot="prepend">分类{{k+1}}</template>
                </el-input>
                <el-button type="primary" @click="changeKind(v.id)">修改</el-button>
                <el-button type="primary" @click="deleteKind(v.id)">删除</el-button>
            </div>
            <!-- <el-button type="primary" style="margin-right:30px;float:right">确定</el-button> -->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            arr:[],
            kindsList:[],
        }
    },
    methods:{
        changeKind( id ){
            this.$prompt('请输入新的分类名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                     this.$axios.post( "/product/product_category/"+id+"/",{'login_token':localStorage.getItem("token"),name:value}
                    ).then((res) => {
                        if( res.data.status == 0 ){
                            this.$message({
                                type: 'success',
                                message: '修改后的分类名称为: ' + value
                            });
                            this.kindList();
                        }else{
                            this.$notify({
                                title: '错误',
                                message: res.data.msg,
                                offset: 0,
                                duration: 1500
                            });
                        }
                    }).catch(function (error) {
                        this.$notify({
                            title: '错误',
                            message: "服务器繁忙",
                            offset: 0,
                            duration: 1500
                        });
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        deleteKind( id ){
            this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$axios.delete( "/product/product_category/"+id+"/",{params:{'login_token':localStorage.getItem("token")}}
                    ).then((res) => {
                        if( res.data.status == 0 ){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.kindList();
                        }else{
                            this.$notify({
                                title: '错误',
                                message: res.data.msg,
                                offset: 0,
                                duration: 1500
                            });
                        }
                    }).catch(function (error) {
                        this.$notify({
                            title: '错误',
                            message: "服务器繁忙",
                            offset: 0,
                            duration: 1500
                        });
                    });
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            
        },
        addNew(){
            if( this.kindsList.length == 6 ){
                this.$notify({
                    title: '错误',
                    message: "您目前最多只能拥有6个分类",
                    offset: 0,
                    duration: 1500
                });
                return
            }
            this.$prompt('请输入新分类名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    if( value.trim().length == 0 ){
                        this.$notify({
                            title: '错误',
                            message: "您输入的分类不合法",
                            offset: 0,
                            duration: 1500
                        });
                        return
                    }
                     this.$axios.post( "/product/product_category/",{'login_token':localStorage.getItem("token"),name:value}
                    ).then((res) => {
                        if( res.data.status == 0 ){
                            this.$message({
                                type: 'success',
                                message: '你的分类名称为: ' + value
                            });
                            this.kindList();
                        }else{
                            this.$notify({
                                title: '错误',
                                message: res.data.msg,
                                offset: 0,
                                duration: 1500
                            });
                        }
                    }).catch(function (error) {
                        this.$notify({
                            title: '错误',
                            message: "服务器繁忙",
                            offset: 0,
                            duration: 1500
                        });
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        kindList(){
            this.kindsList = [];
            this.$axios.get( "/product/product_category/",{params:{'login_token':localStorage.getItem("token")}}
            ).then((res) => {
                if( res.data.status == 0 ){
                    for (const i in res.data.category_list) {
                        this.kindsList.push(res.data.category_list[i])
                        this.arr[i] = res.data.category_list[i].name
                    }
                }else{
                    this.$notify({
                        title: '错误',
                        message: res.data.msg,
                        offset: 0,
                        duration: 1500
                    });
                }
            }).catch(function (error) {
                this.$notify({
                    title: '错误',
                    message: "服务器繁忙",
                    offset: 0,
                    duration: 1500
                });
            });
        }
    },
    mounted(){
        this.kindList()
    }
}
</script>

<style lang="less" scoped>
    .contain{
        border: 1px solid #dadbe0;
        background-color: white;
        border-top: 2px solid #59b7ea;
        padding-left: 20px;
        min-height: 500px;
        position: relative;
        .btn{
            margin: 20px 0;
        }
        >.item{
            width: 900px;
            position: absolute;
            left: 50%;
            margin-left: -450px;
            >div{
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                flex-wrap: nowrap;
            }
        } 
    }
</style>

