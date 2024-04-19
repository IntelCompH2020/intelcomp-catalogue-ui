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

import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchQuery} from "../../domain/search-query";

@Component({
  selector: 'pages-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'catalogue-ui';

  searchForm: FormGroup;

  constructor(public fb: FormBuilder, public router: Router) {
    this.searchForm = fb.group({'query': ['']});
  }

  onSubmit(searchValue: SearchQuery) {
    // console.log('searchValue =>', searchValue);
    if(searchValue.query=='')
      return this.router.navigate(['/search']);
    return this.router.navigate(['/search', searchValue]);
  }
}
