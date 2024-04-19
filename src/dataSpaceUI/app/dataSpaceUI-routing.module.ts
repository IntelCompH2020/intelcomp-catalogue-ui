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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {IntelcompSearchComponent} from "./pages/search/intelcomp-search.component";
import {DatasetLandingPageComponent} from "./pages/landingpages/datasets/dataset-landing-page.component";
import {RequestDataComponent} from "./pages/requestdata/request-data.component";
import {FormComponent} from "./pages/form/form.component";
import {BrowseJobsComponent} from "./pages/browse-jobs/browse-jobs.component";
import {RoleAuthGuardComponent} from "./services/role-auth-guard.component";
import {PayloadComponent} from "./pages/landingpages/payload/payload.component";
import {ResourceSearchComponent} from "./pages/search/resource-search/resource-search.component";
import {environment} from "../environments/environment";
import {HomeDashboardComponent} from "./pages/home/dashboard/home-dashboard.component";
import {LoginGuardComponent} from "./services/login-guard.component";

const dataSpaceRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: HomeDashboardComponent,
    canActivate: [LoginGuardComponent]
  },
  {
    path: 'search',
    component: IntelcompSearchComponent
  },
  {
    path: 'search/:resourceType',
    component: ResourceSearchComponent
  },
  {
    path: 'resource/:id',
    component: DatasetLandingPageComponent
  },
  {
    path: 'request-data',
    component: RequestDataComponent
  },
  {
    path: 'browseJobs',
    component: BrowseJobsComponent
  },
  {
    path: 'landingPage/:resourceType/:identifierValue',
    component: PayloadComponent
  },
  {
    path: 'form/:resourceTypeModel',
    component: FormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-INGESTOR", "OPERATOR_DEVELOPER"]
    }
  },
  {
    path: 'form/:resourceTypeModel/:id',
    component: FormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-INGESTOR", "OPERATOR_DEVELOPER"]
    }
  }
];

const opixRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  {
    path: 'search',
    component: IntelcompSearchComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-INGESTOR", "OPERATOR_DEVELOPER", 'OPERATOR_DATASET-OWNER', 'OPERATOR_DATA-PROCESSOR']
    }
  },
  {
    path: 'search/:resourceType',
    component: ResourceSearchComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-INGESTOR", "OPERATOR_DEVELOPER", 'OPERATOR_DATASET-OWNER', 'OPERATOR_DATA-PROCESSOR']
    }
  },
  {
    path: 'resource/:id',
    component: DatasetLandingPageComponent
  },
  {
    path: 'request-data',
    component: RequestDataComponent
  },
  {
    path: 'browseJobs',
    component: BrowseJobsComponent
  },
  {
    path: 'form/:resourceTypeModel',
    component: FormComponent,
    canActivate: [RoleAuthGuardComponent],
    data: {
      roles: ["OPERATOR_DATASET-INGESTOR", "OPERATOR_DEVELOPER"]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(environment.projectName === 'Opix' ? opixRoutes : dataSpaceRoutes)],
  exports: [RouterModule]
})

export class DataSpaceUIRoutingModule { }
