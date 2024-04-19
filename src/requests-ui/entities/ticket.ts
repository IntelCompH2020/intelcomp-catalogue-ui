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

export class Ticket {
  id: string;
  name: string;
  assigner: From;
  assignee: string;
  created: Date;
  updated: Date;
  description: string;
  status: string;
  priority: string;
  comments: TicketComment[];

  constructor() {
    this.id = null;
    this.name = null;
    this.assigner = null;
    this.assignee = null;
    this.created = null;
    this.updated = null;
    this.description = null;
    this.status = null;
    this.priority = null;
    this.comments = null;
    this.comments = [];
  };

  // constructor(id: string, name: string, assigner: string, assignee: string, created: Date, updated: Date, description: string, status: string, priority: string, comments: TicketComment[]) {
  //   this.id = id;
  //   this.name = name;
  //   this.assigner = assigner;
  //   this.assignee = assignee;
  //   this.created = created;
  //   this.updated = updated;
  //   this.description = description;
  //   this.status = status;
  //   this.priority = priority;
  //   this.comments = comments;
  // }
}

export class TicketComment {
  from: From;
  text: string;
  date: Date;

  constructor() {
    this.from = null;
    this.text = null;
    this.date = null;
  }
}

export class From {
  firstname: string;
  lastname: string;
  email: string;

  constructor() {
    this.firstname = null;
    this.lastname = null;
    this.email = null;
  }
}
