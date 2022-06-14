import {Component, OnInit} from "@angular/core";
import {Ticket, TicketComment} from "../../entities/ticket";
import {RequestsService} from "../../services/requests.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-requests-ui',
  templateUrl: 'request.component.html',
  providers: [RequestsService]
})

export class RequestComponent implements OnInit{

  requestId: string = null;
  request: Ticket = null;
  comment: FormGroup;
  ready = false;
  user = {email: 'testUser@test.ts'}

  constructor(private fb: FormBuilder, private requestService: RequestsService, private route: ActivatedRoute) {
    this.comment = this.fb.group(new TicketComment());
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.requestId = params['id'];
        this.requestService.getRequestById(this.requestId).subscribe(
          next => {this.request = next},
          error => {console.log(error)},
        () => {this.ready = true}
        );
      }
    );
  }

  addComment() {
    if (this.comment.valid) {
      this.comment.get('date').setValue(new Date());
      this.comment.get('from').setValue(this.user.email);
    }
  }

}
