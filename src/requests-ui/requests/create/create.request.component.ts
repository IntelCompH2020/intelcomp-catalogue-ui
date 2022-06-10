import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {Ticket} from "../../entities/ticket";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {RequestsService} from "../../services/requests.service";

@Component({
  selector: 'app-create-request',
  templateUrl: 'create.request.component.html',
  providers: [RequestsService]
})

export class CreateRequestComponent {
  public editor = ClassicEditor;

  createRequestForm = this.fb.group(new Ticket());
  user = {email: 'testUser@test.ts'}

  constructor(private fb: FormBuilder, private requestService: RequestsService) {}

  createRequest() {
    if (this.createRequestForm.valid) {
      this.createRequestForm.get('assigner').setValue(this.user.email);
      this.createRequestForm.get('created').setValue(new Date());
      this.requestService.createRequest(this.createRequestForm.getRawValue()).subscribe(
        res => {console.log(res)},
        error => {console.log(error)},
      );
    }
  }

}
