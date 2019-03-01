import { fork, all } from "redux-saga/effects";
import {watchDoLoginUserData} from "./LoginSaga";


export default function* rootSaga() {
  yield all([
    fork(watchDoLoginUserData),
   
  ]);
 
}
