import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Validation } from 'src/app/models/validation/validation';
import { validationFactory } from 'src/app/models/validation/validation-factory';

@Component({
  selector: 'app-field-validation',
  templateUrl: './field-validation.component.html',
  styleUrls: ['./field-validation.component.scss'],
})
export class FieldValidationComponent implements OnInit, OnChanges {
  @Input() keys: ValidationKeys[] = [];
  @Input() fields: IValidation[] = [];
  @Input() type!: FieldType;

  @Output() addField = new EventEmitter<IValidation>();
  @Output() removeField = new EventEmitter<string>();
  @Output() updateField = new EventEmitter<IValidation>();

  data: { key: ValidationKeys; field: IValidation | null }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.formData();
  }

  ngOnChanges(): void {
    this.formData();
  }

  getTitle = (key: ValidationKeys) => {
    return validationFactory.getKeyTitle(key);
  };

  trackByKey = ({ key }: any) => key;

  formData = () => {
    const data = this.keys.map((key) => {
      const field = this.fields.find((field) => field.key === key);

      return {
        key,
        field: field || null,
      };
    });

    this.setData(data);
  };

  setData = (data: { key: ValidationKeys; field: IValidation | null }[]) => {
    this.data = data;
  };

  onToggle = (key: ValidationKeys) => {
    const founded = this.data.find((o) => o.key === key);

    if (founded) {
      if (founded.field) {
        this.removeField.emit(key);
      }

      if (!founded.field) {
        this.addField.emit(new Validation({ key, value: '' }));
      }
    }
  };

  onUpdate = (field: IValidation) => {
    this.updateField.emit(field);
  };
}
