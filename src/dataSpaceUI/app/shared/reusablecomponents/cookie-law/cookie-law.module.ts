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
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieLawComponent } from './cookie-law.component';
import { CookieLawService } from './cookie-law.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CookieLawComponent ],
  providers: [ CookieLawService ],
  exports: [ CookieLawComponent ]
})
export class CookieLawModule { }

export {
  CookieLawComponent,
  CookieLawService
};
