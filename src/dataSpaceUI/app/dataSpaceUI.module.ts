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
import {DataSpaceUIRoutingModule} from './dataSpaceUI-routing.module';
import {HomeComponent} from "./pages/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CatalogueUiModule} from "../catalogue-ui/catalogue-ui.module";
import {IntelcompSearchComponent} from "./pages/search/intelcomp-search.component";
import {DatasetLandingPageComponent} from "./pages/landingpages/datasets/dataset-landing-page.component";
import {IntelcompFooterComponent} from "./shared/footer/footer.component";
import {RequestDataComponent} from "./pages/requestdata/request-data.component";
import {NavigationService} from "./services/navigation.service";
import {CatalogueService} from "./services/catalogue.service";
import {FormComponent} from "./pages/form/form.component";
import {DynamicFormModule} from "../catalogue-ui/pages/dynamic-form/dynamic-form.module";
import {BrowseJobsComponent} from "./pages/browse-jobs/browse-jobs.component";
import {ReusableComponentsModule} from "./shared/reusablecomponents/reusable-components.module";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {CommonModule} from "@angular/common";
import {RoleAuthGuardComponent} from "./services/role-auth-guard.component";
import {PayloadComponent} from "./pages/landingpages/payload/payload.component";
import {ResourceSearchComponent} from "./pages/search/resource-search/resource-search.component";
import {HomeDashboardComponent} from "./pages/home/dashboard/home-dashboard.component";
import {LoginGuardComponent} from "./services/login-guard.component";

@NgModule({
  declarations: [
    HomeComponent,
    HomeDashboardComponent,
    IntelcompFooterComponent,
    IntelcompSearchComponent,
    DatasetLandingPageComponent,
    RequestDataComponent,
    FormComponent,
    BrowseJobsComponent,
    PayloadComponent,
    ResourceSearchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReusableComponentsModule,
    CatalogueUiModule,
    DynamicFormModule,
    NgSelectModule,
    DataSpaceUIRoutingModule
  ],
  providers: [
    CatalogueService,
    NavigationService,
    AuthenticationService,
    UserService,
    RoleAuthGuardComponent,
    LoginGuardComponent
  ],
  exports: [
    IntelcompFooterComponent
  ]
})

export class DataSpaceUIModule { }
