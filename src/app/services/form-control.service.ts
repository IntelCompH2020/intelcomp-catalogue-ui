import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {FormModel, UiVocabulary} from '../domain/dynamic-form-model';
import {urlAsyncValidator, URLValidator} from '../shared/validators/generic.validator';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FormControlService {
  constructor(public http: HttpClient) { }

  base = environment.API_ENDPOINT;
  private options = {withCredentials: true};

  getFormModel() {
    return this.http.get<FormModel[]>(this.base + '/form/model');
  }

  getUiVocabularies() {
    return this.http.get<Map<string, UiVocabulary[]>>(this.base + `/ui/vocabularies`);
  }

  getDynamicService(id: string) {
    return this.http.get(this.base + `/ui/services/${id}/`, this.options);
  }

  postDynamicService(service: any, edit:boolean) {
    return this.http[edit ? 'put' : 'post'](this.base + '/ui/services', service, this.options);
  }

  toFormGroup(form: FormModel[], checkImmutable: boolean) {
    const group: any = {};
    form.forEach(groups => {
      groups.fields.sort((a, b) => a.field.form.order - b.field.form.order)
      groups.fields.forEach(formField => {
        // console.log(formField.field.name);
        if (formField.field.form.immutable === checkImmutable) {
          if (formField.field.multiplicity) {
            if (formField.field.type === 'url') {
              group[formField.field.name] = formField.field.form.mandatory ?
                new FormArray([new FormControl('', Validators.compose([Validators.required, URLValidator]), urlAsyncValidator(this))])
                : new FormArray([new FormControl('', URLValidator, urlAsyncValidator(this))]);
            } else if (formField.field.type === 'composite') {
              group[formField.field.name] = formField.field.form.mandatory ? new FormArray([], Validators.required)
                : new FormArray([]);
              const subGroup: any = {};
              formField.subFieldGroups.forEach(subField => {
                if (subField.field.type === 'email') {
                  subGroup[subField.field.name] = subField.field.form.mandatory ?
                    new FormControl('', Validators.compose([Validators.required, Validators.email]))
                    : new FormControl('', Validators.email);
                } else if (subField.field.type === 'phone') {
                  subGroup[subField.field.name] = subField.field.form.mandatory ?
                    new FormControl('', Validators.compose([Validators.required, Validators.pattern('[+]?\\d+$')]))
                    : new FormControl('', Validators.pattern('[+]?\\d+$'));
                } else if (subField.field.multiplicity) { // add array inside composite element
                  subGroup[subField.field.name] = subField.field.form.mandatory ?
                    new FormArray([new FormControl('', Validators.required)])
                    : new FormArray([new FormControl('')]);
                } else {
                  subGroup[subField.field.name] = subField.field.form.mandatory ?
                    new FormControl('', Validators.required)
                    : new FormControl('');
                }
                if (subField.field.form.dependsOn !== null) {
                  subGroup[subField.field.name].disable();
                }
              });
              group[formField.field.name].push(new FormGroup(subGroup));
            } else {
              group[formField.field.name] = formField.field.form.mandatory ?
                new FormArray([new FormControl('', Validators.required)])
                : new FormArray([new FormControl('')]);
            }
          } else {
            if (formField.field.type === 'url') {
              group[formField.field.name] = formField.field.form.mandatory ?
                new FormControl('', Validators.compose([Validators.required, URLValidator]), urlAsyncValidator(this))
                : new FormControl('', URLValidator, urlAsyncValidator(this));
            } else if (formField.field.type === 'composite') {
              const subGroup: any = {};
              formField.subFieldGroups.forEach(subField => {
                if (subField.field.type === 'email') {
                  subGroup[subField.field.name] = subField.field.form.mandatory ?
                    new FormControl('', Validators.compose([Validators.required, Validators.email]))
                    : new FormControl('', Validators.email);
                } else if (subField.field.type === 'phone') {
                  subGroup[subField.field.name] = subField.field.form.mandatory ?
                    new FormControl('', Validators.compose([Validators.required, Validators.pattern('[+]?\\d+$')]))
                    : new FormControl('', Validators.pattern('[+]?\\d+$'));
                } else {
                  subGroup[subField.field.name] = subField.field.form.mandatory ?
                    new FormControl('', Validators.required)
                    : new FormControl('');
                }
                if (subField.field.form.dependsOn !== null) {
                  subGroup[subField.field.name].disable();
                }
              });
              group[formField.field.name] = new FormGroup(subGroup);
            } else if (formField.field.type === 'email') {
              group[formField.field.name] = formField.field.form.mandatory ?
                new FormControl('', Validators.compose([Validators.required, Validators.email]))
                : new FormControl('', Validators.email);
            } else if (formField.field.type === 'phone') {
              group[formField.field.name] = formField.field.form.mandatory ?
                new FormControl('', Validators.compose([Validators.required, Validators.pattern('[+]?\\d+$')]))
                : new FormControl('', Validators.pattern('[+]?\\d+$'));
            } else {
              group[formField.field.name] = formField.field.form.mandatory ? new FormControl('', Validators.required)
                : new FormControl('');
            }
          }
        }
      });
    });
    return new FormGroup(group);
  }

  validateUrl(url: string) {
    // console.log(`knocking on: ${this.base}/provider/validateUrl?urlForValidation=${url}`);
    return this.http.get<boolean>(this.base + `/provider/validateUrl?urlForValidation=${url}`);
  }

  static removeNulls(obj: any) {
    const isArray = obj instanceof Array;
    for (const k in obj) {
      if (obj[k] === null || obj[k] === '') {
        isArray ? obj.splice(k, 1) : delete obj[k];
      } else if (typeof obj[k] === 'object') {
        if (typeof obj[k].value !== 'undefined' && typeof obj[k].lang !== 'undefined') {
          if (obj[k].value === '' && obj[k].lang === 'en') {
            obj[k].lang = '';
          }
        }
        FormControlService.removeNulls(obj[k]);
      }
      if (obj[k] instanceof Array && obj[k].length === 0) {
        delete obj[k];
      } else if (obj[k] instanceof Array) {
        for (const l in obj[k]) {
          if (obj[k][l] === null || obj[k][l] === '') {
            delete obj[k][l];
          }
        }
      }
    }
  }

}
