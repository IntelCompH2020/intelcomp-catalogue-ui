/*
 * Copyright 2021-2024 OpenAIRE AMKE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "../domain/userInfo";

@Injectable()
export class UserService {

  base = environment.API_ENDPOINT;
  userInfo: UserInfo = null

  constructor(public http: HttpClient) {}

  getUserInfo() {
    return this.http.get<UserInfo>(this.base + '/user/info');
  }

  getUserToken() {
    return this.http.get(this.base + '/user/token');
  }

  roleToSessionStorage(userInfo: UserInfo) {
    this.userInfo = userInfo;
    sessionStorage.setItem('userRoles', userInfo.roles.toString());
  }

  clearUserInfo() {
    this.userInfo = null;
    sessionStorage.removeItem('userRoles')
  }

}
