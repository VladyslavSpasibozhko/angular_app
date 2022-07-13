import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormController, FormControllerBase } from '../models/form';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  forms = new BehaviorSubject<FormBase[]>([]);
  editForm = new Subject<Form | null>();
  viewForm = new Subject<FormBase | null>();

  constructor(private storageService: StorageService) {
    const forms = storageService.getLocal('FORMS');

    if (forms) {
      this.forms.next(forms);
    }
  }

  saveForms = () => {
    this.storageService.setLocal('FORMS', this.forms.value);
  };

  addForm = (form: FormBase) => {
    this.forms.next(this.forms.value.concat(form));
  };

  updateForm = (data: FormBase) => {
    this.forms
      .pipe(
        take(1),
        map((forms) => forms.map((form) => (data.id === form.id ? data : form)))
      )
      .subscribe((value) => this.forms.next(value));
  };

  removeForm = (id: string) => {
    this.forms.next(this.forms.value.filter((form) => form.id !== id));
  };

  // EDIT FORM
  setEditForm = (id: string) => {
    this.forms
      .pipe(
        map((forms) => forms.filter((form) => form.id === id)),
        map((forms) => forms[0])
      )
      .subscribe((value) => {
        if (value) {
          this.editForm.next(new FormController(value));
        }
      });
  };

  clearEditForm = () => {
    this.editForm.next(null);
  };

  // VIEW FORM
  setViewForm = (id: string) => {
    this.forms
      .pipe(
        map((forms) => forms.filter((form) => form.id === id)),
        map((forms) => forms[0])
      )
      .subscribe((value) => {
        if (value) {
          this.viewForm.next(new FormControllerBase(value));
        }
      });
  };

  clearViewForm = () => {
    this.viewForm.next(null);
  };
}
