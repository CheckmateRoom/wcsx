import axios from 'axios' // axios引用
import Cookies from 'js-cookie'
import router from '../router'

const serivce = axios.create({ // 创建服务
    timeout: 5000000 // 请求延时
})
serivce.interceptors.request.use( // 请求拦截
    // config => {
    //     if ( Cookies.get('USER_TOKEN') && config.url.indexOf("org") != -1 ||  config.url.indexOf("role") != -1 || config.url.indexOf("module") != -1  || config.url.indexOf("user") != -1) {
    //         // console.log(config)
    //         config.headers = {"token":Cookies.get('USER_TOKEN')}
    //     }
    //     return config
    // },
    // error => {
    //     return Promise.reject(error)
    // }
)
serivce.interceptors.response.use( // 回复拦截，主要针对部分回掉数据状态码进行处理
    response => {
        if( JSON.parse(JSON.stringify(response)).data.status === 400 ){
            router.replace({
                path: '/',
                // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
            })
        }
        return response
    },
    error => {
       
        return Promise.reject(error)
    }
)
export default serivce
