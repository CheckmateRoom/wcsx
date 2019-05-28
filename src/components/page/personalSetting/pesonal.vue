<template>
    <div class="contain">
        <span>剩余时间:&nbsp;&nbsp;{{limit_time}}&nbsp;&nbsp;天</span>
        <el-button type="primary" icon="el-icon-info" size="mini" @click="kejin()">充值</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            limit_time:''
        }
    },
    methods:{
        kejin(){
            this.$alert('请在您的小程序中直接进行充值。', '充值', {
                confirmButtonText: '确定',
                callback: action => {
                   return
                }
            });
        }
    },
    mounted(){
        this.$axios.get( "/product/user/info/",{params:{'login_token':localStorage.getItem("token")}}
        ).then((res) => {
            if( res.data.status == 0 ){
                this.limit_time = res.data.valid_days;
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
        padding-top: 40px;
        padding-left: 20px;
        min-height: 200px;
        span{
            color:#a2a1af;
            margin-left: 50px;
            margin-right: 50px;
        }
    }
</style>

