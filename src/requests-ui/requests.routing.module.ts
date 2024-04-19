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
import {RouterModule, Routes} from "@angular/router";
import {RequestComponent} from "./requests/request/request.component";
import {CreateRequestComponent} from "./requests/create/create.request.component";
import {ViewAllRequestsComponent} from "./requests/viewAll/viewAllRequests.component";
import {RoleAuthGuardComponent} from "../dataSpaceUI/app/services/role-auth-guard.component";

const routes: Routes = [
  {
    path: 'create',
    component: CreateRequestComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER"]
    }
  },
  {
    path: 'all',
    component: ViewAllRequestsComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER", "OPERATOR_DATASET-INGESTOR"]
    }
  },
  {
    path: ':id',
    component: RequestComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER",  "OPERATOR_DATASET-INGESTOR"]
    }
  },
  {
    path: ':id/edit',
    component: CreateRequestComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-OWNER"]
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RequestsRoutingModule {}
