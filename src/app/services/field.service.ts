import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldFactory } from '../models/fields/fields-factory';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  fields = new BehaviorSubject<Field[]>([]);

  constructor() {}

  public setFormFields = (fields: Field[]) => {
    this.fields.next(fields);
  };

  public addFormField = () => {
    this.fields.next(this.fields.value.concat(FieldFactory.create('input', {})));
  };

  public removeFormField = (id: string) => {
    this.fields.next(this.fields.value.filter((field) => field.id !== id));
  };

  public updateFormField = (formField: Field) => {
    this.fields.next(this.fields.value.map((field) => (field.id === formField.id ? formField : field)));
  };

  public replaceField = (field: Field) => {
    this.fields.next(this.fields.value.map((f) => (f.id === field.id ? field : f)));
  };

  public clearFormFields = () => {
    this.fields.next([]);
  };
}
