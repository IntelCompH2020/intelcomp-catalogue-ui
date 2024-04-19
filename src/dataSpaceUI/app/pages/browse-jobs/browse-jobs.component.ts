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

import {Component, OnDestroy, OnInit} from "@angular/core";
import {CatalogueService} from "../../services/catalogue.service";
import {BrowseJob} from "../../domain/job";
import {Subscriber} from "rxjs";


@Component({
  selector: 'pages-browse-jobs',
  templateUrl: 'browse-jobs.component.html'
})

export class BrowseJobsComponent implements OnInit, OnDestroy {

  subscriptions = [];
  jobs: BrowseJob[] = [];

  constructor(private catalogueService: CatalogueService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.catalogueService.getJobs().subscribe(
        res => {this.jobs = res},
        error => {console.log(error)},
        () => {
          for (const job of this.jobs) {
            job.callerAttributesObj = JSON.parse(job.callerAttributes);
          }
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      if (subscription instanceof Subscriber) {
        subscription.unsubscribe();
      }
    });
  }

  getJobArguments(obj: object) {
    for (const [key, value] of Object.entries(obj)) {
      // console.log(`key: ${key} value: ${value}`);
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === 'jobArguments') {
          // console.log(subValue);
          return subValue as [object];
        }
      }
    }
    return []
  }

  getValueFromObject(obj: object, keyName: string) {
    for (const [key, value] of Object.entries(obj)) {
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === keyName) {
          return subValue;
        }
      }
    }
    return null;
  }

}
