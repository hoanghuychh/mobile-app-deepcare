import { AsyncStorage } from "react-native";
import Constants from "../commons/Constants";
import StringUrl from "./StringUrl";
import {
  convertDateToMillisecond,
  convertTimeToMillisecond
} from "../commons/Utils";
const TIME_OUT_SERVICE = 5 * 1000; //timeout call service 5s

//service login app, trả về user profile của bệnh nhân
//service login app, trả về user profile của bệnh nhân
function* doLoginApi(input) {
    console.log("nvTien - Api doLoginApi...");
    let xKey = "";
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-key": xKey
    };
    let dataBody = JSON.stringify({
      email: input.email,
      password: input.password,
      phone: input.phone,
      device_token:input.device_token,
      
    });
    return yield handlePostRequest(StringUrl.URL_Login, headers, dataBody);
    
}


export const Api = {
  doLoginApi,
  

};

//function dùng để request lên server theo method POST
function* handlePostRequest(urlApi, headers, dataBody) {
  console.log(`handlePostRequest...data request urlApi: ` + urlApi + ` header= ${JSON.stringify(headers)} requestData = ` + dataBody);
  return yield timeout(
     TIME_OUT_SERVICE,
     fetch(urlApi, {
       method: "POST",
       headers: headers,
       body: dataBody
     })
   )
     .then(response => response.json())
     .then(responseJson => {
       console.log(`handlePostRequest...data response = ${JSON.stringify(responseJson)} `);
       return responseJson;
     })
     .catch(error => {
       //console.error("error..." + error);
       return null;
     });
 }
 
 //function dùng để request lên server theo method GET
 function* handleGetRequest(urlApi, headers) {
  console.log(`handleGetRequest...data request urlApi: ` + urlApi + ` header= ${JSON.stringify(headers)}`);
   return yield timeout(
     TIME_OUT_SERVICE,
     fetch(urlApi, {
       method: "GET",
       headers: headers,
       body: ""
     })
   )
     .then(response => response.json())
     .then(responseJson => {
       console.log(`handleGetRequest...data response = ${JSON.stringify(responseJson)} `);
       return responseJson;
     })
     .catch(error => {
       //console.error("error..." + error);
       return null;
     });
 }
 

//xử lí set timeout cho call service, trường hợp server không trả về response
function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}

//lấy dữ liệu trong cache ra
const getDataStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // Error retrieving data
    console.log("error... " + error.message);
    return null;
  }
};