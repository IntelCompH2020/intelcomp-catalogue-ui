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
import {Router} from "@angular/router";
import {deleteCookie, getCookie} from "../../catalogue-ui/shared/reusable-components/cookie-management";
import {environment} from "../../../environments/environment";
import {UserService} from "./user.service";


@Injectable()
export class AuthenticationService {

  base = environment.API_ENDPOINT;
  loginEndPoint = environment.API_LOGIN;
  cookieName = 'AccessToken';

  constructor(private router: Router, private userService: UserService) {
  }

  tryLogin() {
    if (getCookie(this.cookieName) === null) {
      console.log('Didn\'t find cookie, user is not logged in.' );
      sessionStorage.setItem('redirectUrl', window.location.pathname);
      this.login();
    } else {
      console.log('found cookie, user is logged in');
    }
  }

  login() {
    sessionStorage.setItem('redirectUrl', window.location.pathname)
    window.location.href = this.base + this.loginEndPoint;
  }

  logout() {
    sessionStorage.clear();
    deleteCookie(this.cookieName);
    this.userService.clearUserInfo();
    window.location.href = this.base + '/logout';
  }

  get userRoles(): string[] {
    if (!sessionStorage.getItem('userRoles'))
      return [];
    return sessionStorage.getItem('userRoles').split(',');
  }

  get authenticated(): boolean {
    // console.log(atob(getCookie(this.cookieName).split('.')[1]));
    if (getCookie(this.cookieName) === null) {
      sessionStorage.clear();
      deleteCookie(this.cookieName);
      this.userService.clearUserInfo();
      return false;
    }
    return getCookie(this.cookieName) !== null;
  }

  redirect() {
    if (sessionStorage.getItem('redirectUrl') !== null) {
      let url = sessionStorage.getItem('redirectUrl');
      // if (url === '/home')
      //   return;
      sessionStorage.removeItem('redirectUrl');
      this.router.navigate([url]);
    }
  }

}
