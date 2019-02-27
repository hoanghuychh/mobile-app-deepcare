import axios from 'axios';


let _axios = axios.create({
    baseURL: 'http://192.168.100.22:8000/api/'
});

_axios.interceptors.request.use(config => {
    // Do something before request is sent
    // console.log(config)
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});


export var setApiToken = (token) => {
    _axios.defaults.params = {};
    _axios.defaults.params['token'] = token;
};


export default _axios;