import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Ticket, TicketComment} from "../../entities/ticket";
import {RequestsService} from "../../services/requests.service";
import {UserService} from "../../../dataSpaceUI/services/user.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UIkit from "uikit";

@Component({
  selector: 'app-create-request',
  templateUrl: 'create.request.component.html',
  providers: [RequestsService]
})

export class CreateRequestComponent implements OnInit{
  public editor = ClassicEditor;

  // createRequestForm: FormGroup;
  createRequestForm = this.fb.group(new Ticket());
  request: Ticket = null;
  requestId: string = null;
  user = {email: 'testUser@test.ts'}

  constructor(private fb: FormBuilder, private requestService: RequestsService,
              private router: Router, private route: ActivatedRoute, private userService: UserService) {

    this.createRequestForm.get('name').addValidators(Validators.required);
    this.createRequestForm.get('assignee').addValidators(Validators.required);
    this.createRequestForm.get('description').addValidators(Validators.required);
    this.createRequestForm.get('status').addValidators(Validators.required);
    this.createRequestForm.get('priority').addValidators(Validators.required);
  }

  ngOnInit() {
    if(this.route.snapshot.routeConfig.path.includes('edit')) {
      console.log('τεστ')
      this.route.params.subscribe(
        params => {
          this.requestId = params['id'];
          this.requestService.getRequestById(this.requestId).subscribe(
            next => {
              this.request = next;
              let comments = this.createRequestForm.get('comments') as FormArray;
              for (const comment of this.request.comments) {
                comments.push(this.fb.group(new TicketComment()));
              }
              console.log(this.request);
              this.createRequestForm.patchValue(this.request);
            }
          )
        },
        error => {console.log(error)},
        () => {}
      );
    }
  }

  createRequest() {
    if (this.createRequestForm.valid) {
      if (this.userService.userInfo){
        this.createRequestForm.get('assigner').setValue(this.userService.userInfo.email);
      } else {
        UIkit.notification({
          message: 'Didn\'t find user info please try logging in.',
          status: 'danger',
          pos: 'top-center',
          timeout: 3000
        });
      }
      this.createRequestForm.get('created').setValue(new Date());
      this.requestService.createRequest(this.createRequestForm.getRawValue()).subscribe(
        res => {console.log(res)},
        error => {console.log(error)},
        () => {this.router.navigate(['/requests/all']).then();}
      );
    } else {
      this.createRequestForm.markAllAsTouched();
      // this.createRequestForm.updateValueAndValidity();
      UIkit.notification({
        message: 'The marked red fields are required',
        status: 'danger',
        pos: 'top-center',
        timeout: 3000
      });
    }
  }

  checkFormValidity(formControl: string): boolean {
    return (!this.createRequestForm.get(formControl).valid && this.createRequestForm.get(formControl).touched);
  }

}
