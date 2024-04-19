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

import {Component, OnInit} from "@angular/core";
import {ResourcePayloadService} from "../../../services/resource-payload.service";
import {CatalogueService} from "../../../services/catalogue.service";
import {BrowseJob} from "../../../domain/job";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'home-dashboard',
  templateUrl: 'home-dashboard.component.html',
  providers: [ResourcePayloadService, CatalogueService]
})

export class HomeDashboardComponent implements OnInit {
  toolsCount = 0;
  datasetCount = 0;
  jobs: BrowseJob[] = []

  constructor(private resourceService: ResourcePayloadService, private catalogueService: CatalogueService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.resourceService.getItemsWithQueryParams('dataset_type').subscribe(res=> {
      this.datasetCount = res.total;
    });
    this.resourceService.getItemsWithQueryParams('tool').subscribe(res=> {
      this.toolsCount = res.total;
    });
  }

}
