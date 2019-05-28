<template>
    <keep-alive>
        <div class="contain">
            <div class="title">
                <div class="kind">
                    <span v-for="(v,k) in kinds" :key="k" @click="details(v.id,k)" :class="flag_index == k+1 ? 'flag':'' " >{{v.name}}</span>
                </div>
                <div><el-button type="info" @click="setKinds()" style="margin-right:30px;">设置我的分类</el-button></div>
            </div>
                <div style="margin:10px 0 0 20px;"><el-button type="info" @click="addNew()" v-if="kinds[0]">新增此分类商品</el-button></div>
            <div class="item">
                <div class="items" v-for="(v1,k1) in kinds_items" :key="k1">
                    <div class="top">
                            <img :src="v1.cover" alt="">  
                    </div>
                    <div class="btns">
                        <span @click="setting(v1.id)">设置</span>
                        <span @click="setting_delete(v1.id)">删除</span>
                    </div>
                </div>
            </div>
            <div style="padding-left:20px">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <span>确认删除此商品?</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </keep-alive>
</template>

<script>
export default {
    data(){
        return{
            kinds:[],//分类列表
            kinds_items:[],
            flag_index:1,
            centerDialogVisible:false,
            deleteId:'',
            currentPage1:1,
            total:0,
            chooseId:'',
            chooseIndex:'',
        }
    },
    methods:{
        handleSizeChange(val) {
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            var offset;
            if( val==1 ){
                offset = 0;
            }else{
                offset = (val-1)*20
            }
            this.kinds_items = [];
            this.flag_index = this.chooseIndex + 1;
            localStorage.setItem('category_index',this.flag_index-1);
            this.$axios.get( "/product/product_category/"+this.chooseId+"/",{params:{'login_token':localStorage.getItem("token"),limit:20,offset:offset}}
            ).then((res) => {
                if( res.data.status == 0 ){
                    if( res.data.category_detail.product_list.length == 0 ){
                        this.$notify({
                            title: '提示',
                            message:"您需要为此分类上传商品信息",
                            offset: 0,
                            duration: 1500
                        });
                    }
                    this.total = res.data.category_detail.meta.total_count;
                    for (const val of res.data.category_detail.product_list) {
                        this.kinds_items.push(val)
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

        },
        setting( id ){
            this.$router.push({ path: '/changegood', query: { "id": id } });
        },
        deleteConfirm(){
            this.$axios.delete( "/product/product_info/"+this.deleteId+"/",{params:{'login_token':localStorage.getItem("token")}}
            ).then((res) => {
               
                if( res.data.status == 0 ){
                    this.$notify({
                        title: '提示',
                        message: "删除成功",
                        offset: 0,
                        duration: 1500
                    });
                    this.centerDialogVisible = false;
                    this.kinds_items = [];
                    this.$axios.get( "/product/product_category/"+this.kinds[this.flag_index-1].id+"/",{params:{'login_token':localStorage.getItem("token")}}
                    ).then((res) => {
                       
                        if( res.data.status == 0 ){
                            if( res.data.category_detail.product_list.length == 0 ){
                                this.$notify({
                                    title: '提示',
                                    message:"您需要为此分类上传商品信息",
                                    offset: 0,
                                    duration: 1500
                                });
                            }
                            for (const val of res.data.category_detail.product_list) {
                                this.kinds_items.push(val)
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
        },
        setting_delete( id ){
            this.centerDialogVisible = true;
            this.deleteId = id;
        },
        addNew(){
            this.$router.push({ path: '/newgood', query: { "id":this.kinds[this.flag_index-1].id } });
        },
        setKinds(){
            this.$router.push('/newkind');
        },
        details( id , index ){
            this.chooseId = id;
            this.chooseIndex = index;
            this.currentPage1 = 1;
            this.kinds_items = [];
            this.flag_index = index + 1;
            localStorage.setItem('category_index',this.flag_index-1);
            this.$axios.get( "/product/product_category/"+id+"/",{params:{'login_token':localStorage.getItem("token")}}
            ).then((res) => {
                console.log(res);

                if( res.data.status == 0 ){
                    if( res.data.category_detail.product_list.length == 0 ){
                        this.$notify({
                            title: '提示',
                            message:"您需要为此分类上传商品信息",
                            offset: 0,
                            duration: 1500
                        });
                    }
                    this.total = res.data.category_detail.meta.total_count;
                    for (const val of res.data.category_detail.product_list) {
                        this.kinds_items.push(val)
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
        this.$axios.get( "/product/product_category/",{params:{'login_token':localStorage.getItem("token")}}
        ).then((res) => {
            console.log(res)
            if( res.data.status == 0 ){
                if( res.data.category_list.length == 0 ){
                    this.$notify({
                        title: '提示',
                        message: "请先设置您的分类",
                        offset: 0,
                        duration: 2500
                    });
                    return
                }
                this.chooseId = res.data.category_list[0].id;
                for (const val of res.data.category_list) {
                    this.kinds.push(val)
                }
                if( localStorage.getItem('category_index') ){
                    var id = res.data.category_list[localStorage.getItem('category_index')].id
                    this.flag_index = Number(localStorage.getItem('category_index'))+1;
                }else{
                    var id = res.data.category_list[0].id
                }
                this.$axios.get( "/product/product_category/"+id+"/",{params:{'login_token':localStorage.getItem("token")}}
                ).then((res) => {
                   
                    if( res.data.status == 0 ){
                        this.total = res.data.category_detail.meta.total_count;
                        for (const val of res.data.category_detail.product_list) {
                            this.kinds_items.push(val)
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
}
</script>

<style lang="less" scoped>
    .contain{
        border: 1px solid #dadbe0;
        background-color: white;
        border-top: 2px solid #59b7ea;
        .title{
            height: 55px;
            line-height: 55px;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            border-bottom: 1px solid #ebeef3;
            .kind{
                span{
                    display: inline-block;
                    width: 90px;
                    text-align: center;
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    font-weight: 500;
                    font-size: 14px;
                    padding: 0 5px;
                    color: #9da6af;
                }
            }
        }
        .item{
            min-height: 500px;
            padding: 10px 20px 20px 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            .items{
                width: 210px;
                margin-right: 20px;
                margin-bottom: 25px;
                .top{
                    img{
                        width: 208px;
                        height: 160px;
                        margin-bottom: 10px;
                        border: 1px solid #a2a0ae;
                    }
                }
                .btns{
                    span:first-child{
                        color:white;
                        width: 100px;
                        border-radius: 5px;
                        background-color: #59b7ea;
                        height: 28px;
                        line-height: 28px;
                        text-align: center;
                        display: inline-block;
                        margin-right: 5.5px;
                        font-size: 13px;
                        cursor: pointer;
                    }
                    span:last-child{
                        color:white;
                        width: 100px;
                        border-radius: 5px;
                        background-color: #ff908f;
                        height: 28px;
                        line-height: 28px;
                        text-align: center;
                        display: inline-block;
                        font-size: 13px;
                        cursor: pointer;
                    }

                }
            }
        }
    }
    .flag{
        background:#cdeaf8;
        color:#3e80bd
    }
</style>

