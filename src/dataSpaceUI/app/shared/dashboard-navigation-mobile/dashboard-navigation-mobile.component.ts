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

import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../services/user.service";
import {UserInfo} from "../../domain/userInfo";
import {Subscriber} from "rxjs";

@Component({
  selector: 'app-dashboard-navigation-mobile',
  templateUrl: 'dashboard-navigation-mobile.component.html',
  styleUrls: ['./dashboard-navigation-mobile.component.css']
})

export class DashboardNavigationMobileComponent implements OnInit, OnDestroy {

  subscriptions = [];
  toggle: number[] = [];
  userInfo: UserInfo;
  // roles = ['OPERATOR_DATA-PROCESSOR','OPERATOR_DATASET-INGESTOR','OPERATOR_DATASET-OWNER','OPERATOR_DEVELOPER']

  constructor(private userService: UserService) {
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
          this.userService.clearUserInfo()
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

  hasRole(role: string) {
    // console.log(role);
    // console.log(this.userInfo.roles.indexOf(role) > -1);
    return this.userInfo.roles.indexOf(role) > -1;
    // return this.roles.indexOf(role) > -1;
  }
}
