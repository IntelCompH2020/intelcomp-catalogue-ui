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

import { Injectable } from '@angular/core';

@Injectable()
export class CookieLawService {


  seen(): boolean {
    return this.cookieExists('cookieLawSeen');
  }

  storeCookie(): void {
    return this.setCookie('cookieLawSeen');
  }

  /**
   * try to read a saved cookie
   *
   * @param  {string} name [the cookie name]
   *
   * @return {string}      [the cookie's value]
   */
  private cookieExists(name: string): boolean {
    if (typeof document !== 'undefined') {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = name + '=';
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s\+/g, '');
        if (c.indexOf(cookieName) !== -1) {
          return true;
        }
      }
  }
    return false;
  }

  /**
   * store a new cookie in the browser
   *
   * @param {string} name [the name for the cookie]
   */
  private setCookie(name: string): void {
    if (typeof document !== 'undefined') {
      let d:Date = new Date();
      d.setTime(d.getTime() + 3*30 * 24 * 60 * 60 * 1000); // in 3 months
      let expires:string = `expires=${d.toUTCString()}`;

      document.cookie = encodeURIComponent(name) + '=true; path=/;  expires='+expires+';';
    }
  }
}
