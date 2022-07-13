import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { validationFactory } from 'src/app/models/validation/validation-factory';

@Component({
  selector: 'app-validation-input',
  templateUrl: './validation-input.component.html',
  styleUrls: ['./validation-input.component.scss'],
})
export class ValidationInputComponent implements OnInit {
  @Input() field!: IValidation;
  @Output() updateField = new EventEmitter<IValidation>();

  singleValue: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const singleValues: ValidationKeys[] = ['min', 'max', 'maxLength', 'minLength'];

    if (singleValues.includes(this.field.key)) {
      this.singleValue = true;
    }
  }

  getTitle = (key: ValidationKeys) => {
    return validationFactory.getKeyTitle(key);
  };

  onChangeMessage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.field.changeMessage(target.value);

    this.updateField.emit(this.field);
  };

  onChangeValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.field.changeValue(target.value);

    this.updateField.emit(this.field);
  };
}
