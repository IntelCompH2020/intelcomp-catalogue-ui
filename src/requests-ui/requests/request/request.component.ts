import {Component, OnInit} from "@angular/core";
import {Ticket} from "../../entities/ticket";
import {RequestsService} from "../../services/requests.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-requests-ui',
  templateUrl: 'request.component.html',
  providers: [RequestsService]
})

export class RequestComponent implements OnInit{

  requestId: string = null;
  request: Ticket = null;

  constructor(private requestService: RequestsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params['id'])
        this.requestId = params['id'];
        this.requestService.getRequestById(this.requestId).subscribe(
          next => {this.request = next},
          error => {console.log(error)}
        );
      }
    );
  }

}
