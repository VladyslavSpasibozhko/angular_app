import { INPUT_TYPES } from 'src/app/consts/index';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FieldService } from 'src/app/services/field.service';
import { validationFactory } from 'src/app/models/validation/validation-factory';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit {
  @Input() field!: SingleField;
  @Input() descriptionVisible!: boolean;
  @Output() toggleDescription = new EventEmitter<boolean>();

  inputTypes = INPUT_TYPES;
  validationKeys: ValidationKeys[] = [];
  isValidationVisible: boolean = false;

  constructor(private fieldService: FieldService) {}

  setValidationFields = (type: InputType) => {
    this.validationKeys = validationFactory.getInputValidation(type);
  };

  setValidationVisible = (value: boolean) => {
    this.isValidationVisible = value;
  };

  onToggle(data: MatSlideToggleChange) {
    this.field.changeShort(data.checked);

    if (this.field.inputType !== 'text') {
      this.field.changeInputType('text');
      this.field.clearValidation();
      this.setValidationFields('text');
    }

    this.fieldService.updateFormField(this.field);
  }

  onToggleValidation = (checked: boolean) => {
    this.setValidationVisible(checked);

    if (!checked) {
      this.field.clearValidation();
    }
  };

  onChangeInputType = (value: InputType) => {
    this.field.changeInputType(value);
    this.field.clearValidation();

    this.setValidationFields(this.field.inputType);

    this.fieldService.updateFormField(this.field);
  };

  onUpdateValidationField = (field: IValidation) => {
    this.field.updateValidation(field);
    this.fieldService.updateFormField(this.field);
  };

  onRemoveValidationField = (key: string) => {
    this.field.removeValidation(key);
    this.fieldService.updateFormField(this.field);
  };

  onAddValidationField = (field: IValidation) => {
    this.field.addValidation(field);
    this.fieldService.updateFormField(this.field);
  };

  ngOnInit(): void {
    this.setValidationFields(this.field.inputType);
    this.setValidationVisible(!!this.field.validation.length);
  }
}
