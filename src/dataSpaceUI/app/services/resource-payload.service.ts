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
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Paging} from "../../catalogue-ui/domain/paging";
import {Params} from "@angular/router";

@Injectable()
export class ResourcePayloadService {
  base = environment.API_ENDPOINT;

  constructor(private http: HttpClient) {}

  getItemsByResourceType(resourceType: string, datasetId?: string) {
    if (datasetId)
      return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}&datasets=${datasetId}`);

    return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}`);
  }

  getItemsWithQueryParams(resourceType: string, queryParameters?: Params) {
    let params = new HttpParams();
    if (!queryParameters)
      return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}`);

    for (const [key, value] of Object.entries(queryParameters)) {
      params = params.append(key, value);
    }
    return this.http.get<Paging<any>>(this.base + `/items?resourceType=${resourceType}`, {params: params});
  }

  getItem(resourceType: string, identifierValue: string) {
    return this.http.get(this.base + `/items/search?resourceType=${resourceType}&field=identifier&value=${identifierValue}`);
  }

  getItemById(resourceType: string, id: string) {
    return this.http.get(this.base + `/items/${id}?resourceType=${resourceType}`);
  }

  deleteItem(id: string, resourceType: string) {
    return this.http.delete(this.base + `/items/${id}?resourceType=${resourceType}`);
  }

}
