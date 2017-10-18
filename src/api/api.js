import ElementUI from 'element-ui'
import axios from 'axios';
import Qs from 'Qs'

var ajax = axios.create({
    baseURL: 'http://47.92.68.45:18080',
    headers: {},
    withCredentials: true, //cookie
    crossDomain: true //跨域
});

//添加一个请求拦截器
ajax.interceptors.request.use(function(config) {
    //在请求发出之前进行一些操作
    if (sessionStorage.getItem('jwt')) {
        config.headers.TOKEN = sessionStorage.getItem('jwt');
    }
    return config;
}, function(err) {
    console.error(err);
    ElementUI.Message.error({
        message: '请求发生错误,请稍后再试!',
        type: 'error'
    });
    //Do something with request error
    return Promise.reject(err);
});
//添加一个响应拦截器
ajax.interceptors.response.use(function(res) {
    //在这里对返回的数据进行处理
    if (!res.data.status) {
        ElementUI.Message.error({
            message: res.data.message,
            type: 'error'
        });
        // if(res.data.errorCode == 401){
        //     location.href = '/login'
        // }
        throw new Error(res.data.message);
    }

    return res.data.data;
}, function(err) {
    console.error(err);
    ElementUI.Message.error({
        message: '响应发生错误,请稍后再试!',
        type: 'error'
    });
    //Do something with response error
    return Promise.reject(err);
})




//获取店铺分类
export const shopCategoryList = () => {
    return ajax.get('seller/shopCategory');
};

//关键字定位
export const addStoreStepOne = params => {
    return ajax.put('seller/shopDetail', params);
};

//获取省列表
export const getProvinceList = () => {
    return ajax.get('commons/region/province');
};
//获取市列表
export const getAllCityList = () => {
    return ajax.get('commons/region/city');
};
//获取区列表
export const getDistrictList = cityId => {
    return ajax.get('commons/region/area/' + cityId);
};
//根据省id获取市列表
export const getCityListByProvinceId = provinceId => {
    return ajax.get('commons/region/city/' + provinceId);
};






//文件上传 前台文件需要设置一个path属性
export const uploadFiles = params => {
    return ajax.post('commons/upload' + params.path, params);
};

