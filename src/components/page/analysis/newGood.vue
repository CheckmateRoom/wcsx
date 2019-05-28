<template>
    <div class="contain">
        <input type="file" id="func" @change='add_img1' style="display:none">
        <div class="upload">
            <div class="upload_items">
                <img :src="uploaded[0]?uploaded[0]:picUrl " alt="">  
                <div v-if="uploaded[0]" @click="deletePic(0)">删除</div>
                <p @click="upload_pic()">上传图片</p>
            </div>
            <div class="upload_items">
                <img :src="uploaded[1]?uploaded[1]:picUrl " alt="">  
                <div v-if="uploaded[1]" @click="deletePic(1)">删除</div>
                <p @click="upload_pic()">上传图片</p>
            </div>
            <div class="upload_items">
                <img :src="uploaded[2]?uploaded[2]:picUrl " alt="">  
                <div v-if="uploaded[2]" @click="deletePic(2)">删除</div>
                <p @click="upload_pic()">上传图片</p>
            </div>
            <div class="upload_items">
                <img :src="uploaded[3]?uploaded[3]:picUrl " alt="">  
                <div v-if="uploaded[3]" @click="deletePic(3)">删除</div>
                <p @click="upload_pic()">上传图片</p>
            </div>
            <div class="upload_items">
                <img :src="uploaded[4]?uploaded[4]:picUrl " alt="">  
                <div v-if="uploaded[4]" @click="deletePic(4)">删除</div> 
                <p @click="upload_pic()">上传图片</p>
            </div>
            <div class="upload_items">
                <img :src="uploaded[5]?uploaded[5]:picUrl " alt="">  
                <div v-if="uploaded[5]" @click="deletePic(5)">删除</div>
                <p @click="upload_pic()">上传图片</p>
            </div>
        </div>
        <div class="info">
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名 称">
                        <el-input v-model="form.name" placeholder="此项为必填项"></el-input>
                    </el-form-item>
                   <el-form-item label="价 格">
                        <el-input v-model="form.price" placeholder="此项为非必填项"></el-input>
                    </el-form-item>
                    <el-form-item label="规 格">
                        <el-input v-model="form.standard" placeholder="此项为非必填项"></el-input>
                    </el-form-item>
                    <el-form-item label="介 绍">
                        <el-input type="textarea" v-model="form.description" placeholder="此项为非必填项"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即保存</el-button>
                        <el-button type="primary" @click="continueSubmit()">继续创建</el-button>
                        <el-button @click="cancel()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
            createFlag:false,//商品是否被创建实例
            form:{
                name:"",
                price:"",
                standard:"",
                description:""
            },
            uploadUrl:"https://www.njhaoji.com/product/product_image/",
            uploaded:[],
            uploadedId:[],
            product_id:"",//商品id
            fullscreenLoading:false,
            picUrl:'./static/img/default.jpg'
        }
    },
    methods:{
        deletePic( index ){
            this.$axios.delete( "/product/product_image/"+this.uploadedId[index]+"/",{params:{'login_token':localStorage.getItem("token")}}
            ).then((res) => {
                if( res.data.status == 0 ){
                    this.$notify({
                        title: '成功',
                        message:"删除成功",
                        offset: 0,
                        duration: 1500
                    });
                    this.uploaded.splice(index,1)
                    this.uploadedId.splice(index,1)
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
        cancel(){
            this.$router.go(-1)
        },
        continueSubmit(){
            this.createFlag = false;
            for (const key in this.form) {
                this.form[key] = ""
            }
            this.uploaded = [];
            this.product_id = "";
        },
        onSubmit(){
            if( !this.createFlag ){
                this.$notify({
                    title: '错误',
                    message: "您必须至少上传一张图片",
                    offset: 0,
                    duration: 2500
                });
                return;
            }
            if( !this.form.name ){
                this.$notify({
                    title: '错误',
                    message: "您必须填写商品名称",
                    offset: 0,
                    duration: 2500
                });
                return;
            }
            var params =JSON.parse(JSON.stringify(this.form));
            params.login_token = localStorage.getItem("token");
            this.$axios.post( "/product/product_info/"+this.product_id+"/",params
            ).then((res) => {
                if( res.data.status == 0 ){
                    this.$notify({
                        title: '成功',
                        message:"创建成功",
                        offset: 0,
                        duration: 1500
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
        upload_pic(){
            if( this.uploaded.length == 6 ){
                this.$notify({
                    title: '错误',
                    message: "最多支持6张图片",
                    offset: 0,
                    duration: 1500
                });
                return
            }
            var cc = document.getElementById("func")
            cc.click();
        },
        add_img(event){
            if( !this.createFlag ){
                let reader =new FileReader();
                let img1=event.target.files[0];
                var fileName = img1.name.substring(img1.name.lastIndexOf(".")+1).toLowerCase();
                if(fileName !="jpg" && fileName !="jpeg" && fileName !="pdf" && fileName !="png" && fileName !="dwg" && fileName !="gif" ){
                    this.$notify({
                        title: '错误',
                        message: "请上传图片格式",
                        offset: 0,
                        duration: 1500
                    });
                    return
                }
                var uri = ''
                let form = new FormData(); 
                form.append('image',img1,img1.name);
                form.append('login_token',localStorage.getItem("token"));
                form.append("category_id",this.$route.query.id)
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('/product/product_image/',form,{
                    headers:{'Content-Type':'multipart/form-data'}
                }).then(response => {
                   if( response.data.status == 0 ){
                    var src = window.URL.createObjectURL(document.getElementById("func").files[0]);
                    this.uploaded.push(src);
                    this.uploadedId.push(response.data.image_id);
                    var img_arr = document.getElementsByTagName("img")
                    for (let i = 0; i < img_arr.length; i++) {
                        var width1 = img_arr[0].width;
                        img_arr[i].style.height= width1/1.3 +"px";
                    }
                    this.createFlag = true;
                    this.product_id = response.data.product_id;
                    loading.close();
                    this.$notify({
                        title: '成功',
                        message: "上传成功",
                        offset: 0,
                        duration: 1500
                    });
                    document.getElementById('func').value = "";
                   }else{
                        this.$notify({
                            title: '错误',
                            message: res.data.msg,
                            offset: 0,
                            duration: 1500
                        });
                        loading.close();
                    }
                }).catch(error => {
                    alert('上传图片出错！');
                    loading.close();
                });
            }else{
                let reader =new FileReader();
                let img1=event.target.files[0];
                var fileName = img1.name.substring(img1.name.lastIndexOf(".")+1).toLowerCase();
                if(fileName !="jpg" && fileName !="jpeg" && fileName !="pdf" && fileName !="png" && fileName !="dwg" && fileName !="gif" ){
                    this.$notify({
                        title: '错误',
                        message: "请上传图片格式",
                        offset: 0,
                        duration: 1500
                    });
                    return
                }
                var uri = ''
                let form = new FormData(); 
                form.append('image',img1,img1.name);
                form.append('login_token',localStorage.getItem("token"));
                form.append("product_id",this.product_id)
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('/product/product_image/',form,{
                    headers:{'Content-Type':'multipart/form-data'}
                }).then(response => {
                    if( response.data.status == 0 ){
                    var src = window.URL.createObjectURL(document.getElementById("func").files[0]);
                    this.uploaded.push(src);
                    this.uploadedId.push(response.data.image_id);
                    var img_arr = document.getElementsByTagName("img")
                    for (let i = 0; i < img_arr.length; i++) {
                        var width1 = img_arr[0].width;
                        img_arr[i].style.height= width1/1.3 +"px";
                    }
                    this.createFlag = true;
                    loading.close();
                    this.$notify({
                        title: '成功',
                        message: "上传成功",
                        offset: 0,
                        duration: 1500
                    });
                    document.getElementById('func').value = "";
                   }else{
                        this.$notify({
                            title: '错误',
                            message: res.data.msg,
                            offset: 0,
                            duration: 1500
                        });
                        loading.close();
                    }
                }).catch(error => {
                    alert('上传图片出错！');
                    loading.close();
                });
            }
        },
        add_img1(event){
            var _this = this;
            let img1=event.target.files[0];
            var fileName = img1.name.substring(img1.name.lastIndexOf(".")+1).toLowerCase();
            if(fileName !="jpg" && fileName !="jpeg" && fileName !="pdf" && fileName !="png" && fileName !="dwg" && fileName !="gif" ){
                this.$notify({
                    title: '错误',
                    message: "请上传图片格式",
                    offset: 0,
                    duration: 1500
                });
                return
            }

                var fileObj = document.getElementById("func").files[0]; // js 获取文件对象
                // 压缩图片需要的一些元素和对象
                var reader = new FileReader(),
                    img = new Image();
    
                // 选择的文件对象
                var file = null;
                file = event.target.files[0];
                // 选择的文件是图片
                if(file.type.indexOf("image") == 0) {
                    reader.readAsDataURL(file);
                }
    
                // 文件base64化，以便获知图片原始尺寸
                reader.onload = function(e) {
                    img.src = e.target.result;
                };
    
                // 缩放图片需要的canvas
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
    
                // base64地址图片加载完毕后
                img.onload = function() {
                    // 图片原始尺寸
                    var originWidth = this.width;
                    var originHeight = this.height;
                    // 最大尺寸限制
                    var maxWidth = 400,
                        maxHeight = 400;
                    // 目标尺寸
                    var targetWidth = originWidth,
                        targetHeight = originHeight;
                    // 图片尺寸超过400x400的限制
                    if(originWidth > maxWidth || originHeight > maxHeight) {
                        if(originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            targetWidth = maxWidth;
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                        } else {
                            targetHeight = maxHeight;
                            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                        }
                    }
    
                    // canvas对图片进行缩放
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    // 清除画布
                    context.clearRect(0, 0, targetWidth, targetHeight);
                    // 图片压缩
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                    // canvas转为blob并上传
                    canvas.toBlob(function(blob) {
                        //在这里实现上传操作
                        var base64 ;
                        var a = new FileReader();
                        a.onload = function (e) { 
                            base64 = e.target.result.split(',');
                            const loading = _this.$loading({
                                lock: true,
                                text: 'Loading',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            if( !_this.createFlag ){
                                _this.$axios.post( "/product/pc/product_image/",{'login_token':localStorage.getItem("token"),'category_id':_this.$route.query.id,image:base64[1]}
                                ).then((response) => {
                                    if( response.data.status == 0 ){
                                        var src = window.URL.createObjectURL(document.getElementById("func").files[0]);
                                        _this.uploaded.push(src);
                                        _this.uploadedId.push(response.data.image_id);
                                        var img_arr = document.getElementsByTagName("img");
                                        for (let i = 0; i < img_arr.length; i++) {
                                            var width1 = img_arr[0].width;
                                            img_arr[i].style.height= width1/1.3 +"px";
                                        }
                                        _this.createFlag = true;
                                        _this.product_id = response.data.product_id;
                                        loading.close();
                                        _this.$notify({
                                            title: '成功',
                                            message: "上传成功",
                                            offset: 0,
                                            duration: 1500
                                        });
                                        document.getElementById('func').value = "";
                                    }else{
                                        _this.$notify({
                                            title: '错误',
                                            message: res.data.msg,
                                            offset: 0,
                                            duration: 1500
                                        });
                                        loading.close();
                                    }
                                    }).catch(error => {
                                        alert('上传图片出错！');
                                        loading.close();
                                    });
                            }else{
                                _this.$axios.post( "/product/pc/product_image/",{'login_token':localStorage.getItem("token"),'product_id':_this.product_id,image:base64[1]}
                                ).then((response) => {
                                    if( response.data.status == 0 ){
                                        var src = window.URL.createObjectURL(document.getElementById("func").files[0]);
                                        _this.uploaded.push(src);
                                        _this.uploadedId.push(response.data.image_id);
                                        var img_arr = document.getElementsByTagName("img");
                                        for (let i = 0; i < img_arr.length; i++) {
                                            var width1 = img_arr[0].width;
                                            img_arr[i].style.height= width1/1.3 +"px";
                                        }
                                        _this.createFlag = true;
                                        loading.close();
                                        _this.$notify({
                                            title: '成功',
                                            message: "上传成功",
                                            offset: 0,
                                            duration: 1500
                                        });
                                        document.getElementById('func').value = "";
                                    }else{
                                        _this.$notify({
                                            title: '错误',
                                            message: res.data.msg,
                                            offset: 0,
                                            duration: 1500
                                        });
                                        loading.close();
                                    }
                                    }).catch(error => {
                                        alert('上传图片出错！');
                                        loading.close();
                                    });
                            }
                        }
                        a.readAsDataURL(blob);
    
                        
                    }, file.type || 'image/png');
                };

        }
        
    },
    mounted(){
        
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
        padding-right: 20px;
        min-height: 200px;
        box-sizing: border-box;
        .upload{
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            width: 100%;
            .upload_items{
                width:15%;
                position: relative;
                img{
                    width: 100%;
                    height: auto;
                }
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 13px;
                    border-radius: 5px;
                    background-color: #6bbef2;
                    height: 30px;
                    line-height: 30px;
                    color: white;
                    cursor: pointer;
                    margin-top: 5px;
                }
                div{
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: white;
                    background: rgba(0, 0, 0, 0.5);
                    font-size: 14px;
                    padding: 4px;
                    cursor: pointer;
                }
            }
        }
        .info{
            padding: 0 20%;
            margin-top: 50px;
        }
    }
</style>

