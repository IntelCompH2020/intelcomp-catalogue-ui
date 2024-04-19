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

import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {environment} from "../../../../../environments/environment";
import {UserService} from "../../../services/user.service";
import {UserInfo} from "../../../domain/userInfo";

declare var UIkit;

@Component({
  selector: 'app-top-menu-landing',
  templateUrl: 'top-menu-landing.component.html',
  styleUrls: ['../top-menu.component.css'],
})

export class TopMenuLandingComponent implements OnInit {

  subscriptions = [];
  userInfo: UserInfo = null;
  projectName = environment.projectName;

  logoURL = environment.logoURL ? environment.logoURL : 'https://www.opix.ai/images/Logos/opix%20logo%202.svg';

  constructor(private authentication: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.getUserInfo().subscribe(
        res => {
          this.userInfo = res;
          this.userService.roleToSessionStorage(res);
          // console.log(this.userInfo);
        }, error => {
          console.log(error);
          this.userService.clearUserInfo();
        }
      )
    );
  }

  closeCanvas(element) {
    UIkit.offcanvas(element).hide();
  }

  parseUsername() {
    let firstLetters = "";
    let matches = this.userInfo.fullname?.match(/\b(\w)/g);
    if(matches)
      firstLetters += matches.join('');
    return firstLetters;
  }

  hasRoles() {
    return this.authentication.userRoles.length > 0
  }

  hasRole(role: string) {
    return this.userInfo.roles.indexOf(role) > -1;
  }

  logInButton() {
    this.authentication.login();
  }

  logout() {
    this.authentication.logout();
  }

  isLoggedIn() {
    return this.authentication.authenticated;
  }
}
