<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">小程序后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="mobile">
                    <el-input v-model="ruleForm.mobile" placeholder="账号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 请输入用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import baseUrl from "../../../static/js/init.js"
    let { host, host2 } = baseUrl

    export default {
        data: function(){
            return {
                ruleForm: {
                    mobile: 'admin',
                    password: '123'
                },
                rules: {
                    mobile: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         this.$axios.post( "/product/login/",this.ruleForm
                //         ).then((res) => {
                //             if( res.data.status == 0 ){
                //                 localStorage.setItem('ms_username',this.ruleForm.mobile);
                //                 localStorage.setItem('token',res.data.login_token);
                //                 this.$router.push('/finance');
                //             }else{
                //                 this.$notify({
                //                     title: '错误',
                //                     message: res.data.msg,
                //                     offset: 0,
                //                     duration: 1500
                //                 });
                //             }
                //         }).catch(function (error) {
                //             this.$notify({
                //                 title: '错误',
                //                 message: "服务器繁忙",
                //                 offset: 0,
                //                 duration: 1500
                //             });
                //         });
                    
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
                localStorage.setItem('ms_username',this.ruleForm.mobile);
                this.$router.push('/finance');

            }
        },
        mounted(){
            // this.$axios.post( host2+"/sso/?redirect=http://localhost:8080/",
            // ).then((res) => {
            //     console.log(res)
            // }).catch(function (error) {
            //     // this.$notify({
            //     //     title: '错误',
            //     //     message: "服务器繁忙",
            //     //     offset: 0,
            //     //     duration: 1500
            //     // });
            // });
            // window.location.href = host2+"/sso/?redirect=http://"+window.location.host+"/"
            // window.location.href = host2+"/sso/?redirect=http://localhost:8080/dist/"
        }
    }
</script>

<style scoped>
    .login-wrap{
        /* position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/login-bg.png);
        background-size: contain; */
        background: url(../../assets/login-bg.png);
        position:fixed;
        top: 0;
        left: 0;
        width:100%;
        height:100%;
        min-width: 1000px;
        /* z-index:-10; */
        zoom: 1;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: 100% 100%; 
        /* background-position: center 0; */
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:400px;
        margin:-190px 0 0 -200px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
        z-index: 100000;
    }
    .ms-content{
        padding: 30px 30px 15px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>