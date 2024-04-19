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

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NavigationService {

    public dataRequestIds: BehaviorSubject<{instanceVersion:string, datasetId:string}> = new BehaviorSubject<{instanceVersion:string, datasetId:string}>(null);

    constructor() {
    }

    go(url: string) {
      location.href = url;
    }

    goOffsite(url: string) {
        window.location.href = url;
    }

    public setDataRequestIds(instanceVersion: string, datasetId: string) {
      console.log('instanceVersion: ' + instanceVersion + ', datasetId : ' + datasetId);
      this.dataRequestIds.next({instanceVersion:instanceVersion, datasetId:datasetId});
    }

    public get dataRequestIds$() {
      // console.log('get dataRequestIdsObservable', this.dataRequestIds);
      return this.dataRequestIds.asObservable();
    }

}
