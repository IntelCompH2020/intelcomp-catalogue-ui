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

export class Job {
  callerAttributes: string;
  jobArguments: JobArgument[];
  serviceArguments: ServiceArgument;


  constructor() {
    this.callerAttributes = ''
    this.jobArguments = [];
    this.serviceArguments = new ServiceArgument();
  }
}

export class JobArgument {
  name: string;
  value: string[] | string;


  constructor(name: string, value: string[] | string) {
    this.name = name;
    this.value = value;
  }
}

export class ServiceArgument {
  infraId: string;
  processId: string;
  user: string;

  constructor() {
    this.infraId = null;
    this.processId = null;
    this.user = null;
  }
}

export class BrowseJob {
  id: string;
  name: string;
  label: string;
  createdAt: string;
  launchedAt: string;
  finishedAt: string;
  user: string;
  infraId: string;
  callerAttributes: string;
  callerAttributesObj: object;
  mergedStatus: string;
  status: Status[];
}

export class Status {
  id: string;
  timestamp: string;
  status: string;
  source: string;
  payload: string;
}
