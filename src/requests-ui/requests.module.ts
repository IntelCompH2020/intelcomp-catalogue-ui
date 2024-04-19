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

import {NgModule} from "@angular/core";
import {RequestComponent} from "./requests/request/request.component";
import {RequestsRoutingModule} from "./requests.routing.module";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CreateRequestComponent} from "./requests/create/create.request.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ViewAllRequestsComponent} from "./requests/viewAll/viewAllRequests.component";


@NgModule({
  declarations: [
    RequestComponent,
    CreateRequestComponent,
    ViewAllRequestsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RequestsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})

export class RequestsModule {}
