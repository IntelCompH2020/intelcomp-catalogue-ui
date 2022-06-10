import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../entities/ticket";

@Injectable()
export class RequestsService {
  base = environment.API_ENDPOINT;

  constructor(public http: HttpClient) {}

  getAllRequests() {
    return this.http.get<Ticket[]>(this.base + '/tickets');
  }

  getRequestById(requestId: string) {
    return this.http.get<Ticket>(this.base + `/tickets/${requestId}`);
  }

  createRequest(ticket: Ticket) {
    return this.http.post<Ticket>(this.base + '/tickets', ticket);
  }
}