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
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {From, Ticket} from "../../entities/ticket";
import {RequestsService} from "../../services/requests.service";
import {UserService} from "../../../dataSpaceUI/app/services/user.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UIkit from "uikit";

@Component({
  selector: 'app-create-request',
  templateUrl: 'create.request.component.html',
  styleUrls: ['create.request.component.scss'],
  providers: [RequestsService]
})

export class CreateRequestComponent implements OnInit{
  public editor = ClassicEditor;

  createRequestForm: FormGroup;
  request: Ticket = null;
  requestId: string = null;
  edit = false;

  constructor(private fb: FormBuilder, private requestService: RequestsService,
              private router: Router, private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.createRequestForm = this.fb.group(new Ticket());
    this.createRequestForm.setControl('assigner', this.fb.group(new From()));
    this.addValidators();
    if (this.route.snapshot.routeConfig.path.includes('edit')) {
      this.edit = true;
      this.route.params.subscribe(
        params => {
          this.requestId = params['id'];
          this.requestService.getRequestById(this.requestId).subscribe(
            next => {
              this.request = next;
              this.createRequestForm.patchValue(this.request);
            }
          );
        },
        error => {console.log(error)},
        () => {}
      );
    }
  }

  createRequest() {
    if (this.createRequestForm.valid) {
      this.createRequestForm.get('created').setValue(new Date());
      this.createRequestForm.get('status').setValue('Submitted');
      if (this.userService.userInfo){
        this.createRequestForm.get('assigner').get('email').setValue(this.userService.userInfo.email);
        this.createRequestForm.get('assigner.firstname').setValue(this.userService.userInfo.name);
        this.createRequestForm.get('assigner.lastname').setValue(this.userService.userInfo.surname);
        this.userService.getUserToken().subscribe(
          res => {
            this.requestService.createRequest(this.createRequestForm.getRawValue(), res['tokenValue']).subscribe(
              res => {this.router.navigate(['/requests/all']).then();},
              error => {console.log(error)},
              () => {}
            );
          },
          error => {console.error(error)}
        );
      } else {
        UIkit.notification({
          message: 'Didn\'t find user info please try logging in.', status: 'danger', pos: 'top-center', timeout: 3000
        });
      }
    } else {
      this.createRequestForm.markAllAsTouched();
      UIkit.notification({
        message: 'The marked red fields are required', status: 'danger', pos: 'top-center', timeout: 3000
      });
    }
  }

  editRequest() {
    if (this.createRequestForm.valid) {
      this.createRequestForm.get('updated').setValue(new Date());
      this.userService.getUserToken().subscribe(
        res => {
          this.requestService.editRequest(this.requestId, this.createRequestForm.getRawValue(), res['tokenValue']).subscribe(
            res => {
              this.router.navigate(['/requests/all']).then();
            },
            error => {
              console.log(error)
            }
          );
        });
    } else {
      this.createRequestForm.markAllAsTouched();
      UIkit.notification({
        message: 'The marked red fields are required', status: 'danger', pos: 'top-center', timeout: 3000
      });
    }
  }

  checkFormValidity(formControl: string): boolean {
    return (!this.createRequestForm.get(formControl).valid && this.createRequestForm.get(formControl).touched);
  }

  addValidators() {
    this.createRequestForm.get('name').addValidators(Validators.required);
    this.createRequestForm.get('description').addValidators(Validators.required);
    this.createRequestForm.get('priority').addValidators(Validators.required);
    if (this.edit) {
      this.createRequestForm.get('status').addValidators(Validators.required);
      this.createRequestForm.get('assignee').addValidators(Validators.required);
    }
  }

}
