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
import {RequestsService} from "../../services/requests.service";
import {Ticket} from "../../entities/ticket";
import {UserService} from "../../../dataSpaceUI/app/services/user.service";

import UIkit from 'uikit';

@Component({
  selector: 'app-requests',
  templateUrl: 'viewAllRequests.component.html',
  providers: [RequestsService]
})

export class ViewAllRequestsComponent implements OnInit {

  requests: Ticket[] = null;
  request: Ticket = null;
  message: string = null;

  constructor(private requestService: RequestsService, private userService: UserService) {
  }

  ngOnInit() {
    this.getAllRequests();
  }

  assignToMe(requestId: string) {
    // console.log(requestId);
    if (this.userService.userInfo) {
      this.requestService.getRequestById(requestId).subscribe(
        res => {
          this.request = res;
          this.request.assignee = this.userService.userInfo.email;
          this.request.status = 'Assigned to ingestor';
          this.request.updated = new Date();
          // console.log(this.userService.userInfo);
          // console.log(this.request);
          this.userService.getUserToken().subscribe({
            next: value => {
              console.log(value['tokenValue']);
              this.requestService.editRequest(requestId, this.request, value['tokenValue']).subscribe(
                res => {
                  this.getAllRequests();
                },
                error => {
                  this.message = 'Something went bad please contact the developing team';
                  this.showNotification();
                }
              );
            }
          });

        },
        error => {
          this.message = 'Something went bad please contact the developing team';
          this.showNotification();
        }
      );
    } else {
      this.message = 'Didn\'t find user info please try logging in.';
      this.showNotification();
    }
  }

  hasRole(role: string) {
    return this.userService.userInfo?.roles.indexOf(role) > -1;
  }

  getAllRequests () {
    this.requestService.getAllRequests().subscribe(
      next => {this.requests = next},
      error => {console.log(error)}
    );
  }

  showNotification() {
    UIkit.notification({
      message: this.message, status: 'danger', pos: 'top-center', timeout: 3000
    });
  }

}
