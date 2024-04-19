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

/**
 * Created by stefania on 4/6/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenPageComponent } from './403-forbidden-page.component';
import { ReadMoreComponent, ReadMoreTextComponent } from './read-more.component';
import { SideMenuDashboardComponent } from "../sidemenudashboard/side-menu-dashboard.component";
import { TopMenuLandingComponent } from "../top-menu/topmenulanding/top-menu-landing.component";
import { DashboardNavigationMobileComponent } from "../dashboard-navigation-mobile/dashboard-navigation-mobile.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // TabsModule.forRoot(),
    // ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    TopMenuLandingComponent,
    SideMenuDashboardComponent,
    DashboardNavigationMobileComponent,
    // FooterComponent,
    ForbiddenPageComponent,
    ReadMoreComponent,
    ReadMoreTextComponent,
  ],
  exports: [
    TopMenuLandingComponent,
    SideMenuDashboardComponent,
    DashboardNavigationMobileComponent,
    // SideMenuComponent,
    // FooterComponent,
    ForbiddenPageComponent,
    ReadMoreComponent,
    ReadMoreTextComponent,
  ],
  providers: [
    // HelpContentService
  ],
})

export class ReusableComponentsModule {
}
