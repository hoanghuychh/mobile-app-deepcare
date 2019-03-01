import axios from 'axios';


let _axios = axios.create({
    baseURL: 'http://35.238.126.42:443/',
    timeout: 10 * 1000, //timeout 10s
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