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

import {Section} from "../../catalogue-ui/domain/dynamic-form-model";

export class Survey {
  id: string;
  name: string;
  description: string;
  notice: string;
  type: string;
  creationDate: string;
  createdBy: string;
  modificationDate: string;
  modifiedBy: string;
  chapters: Section[];
}


export class SurveyAnswer {
  id: string;
  modelId: string;
  stakeholderId: string;
  chapterAnswers: Map<string, ChapterAnswer>;
  metadata: Metadata;
  validated: boolean;
  published: boolean;
  chapterId: string;


  constructor(chapterAnswers: Map<string, ChapterAnswer>, surveyId: string) {
    this.id = null;
    this.chapterAnswers = chapterAnswers;
    this.modelId = surveyId;
    this.metadata = null;
  }
}

export class ChapterAnswer {
  chapterId: string;
  answer: Object;
  metadata: Metadata;
  id: string;


  constructor(chapterId: string, answer: Object) {
    this.chapterId = chapterId;
    this.answer = answer;
  }
}

export class ResourcePermission {
  resourceId: string;
  permissions: string[];
}

export class Metadata {
  creationDate: string;
  createdDy: string;
  modificationDate: string;
  modifiedBy: string;
}

export class SurveyInfo {
  surveyId: string;
  surveyAnswerId: string;
  surveyName: string;
  validated: boolean;
  published: boolean;
  lastUpdate: Date;
  editedBy: string[];
  progressRequired: Progress;
  progressTotal: Progress;
  stakeholder: string;
}

export class Progress {
  current: number;
  total: number;
}
