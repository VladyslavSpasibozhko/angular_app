import { Component, EventEmitter, Input, OnInit, Output, OnChanges, ViewChildren, AfterViewInit } from '@angular/core';
import { ElementDirective } from 'src/app/directives/element.directive';
import { Option } from 'src/app/models/option/option';
import { validationFactory } from 'src/app/models/validation/validation-factory';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-field-options',
  templateUrl: './field-options.component.html',
  styleUrls: ['./field-options.component.scss'],
})
export class FieldOptionsComponent implements OnInit, OnChanges {
  @Input() field!: MultiField;
  @Input() descriptionVisible!: boolean;
  @Output() toggleDescription = new EventEmitter<boolean>();

  isValidationVisible: boolean = false;
  validationKeys: ValidationKeys[] = [];

  constructor(private fieldService: FieldService) {}

  ngOnInit(): void {
    this.setValidationFields(this.field.type);

    if (this.field.validation.length) {
      this.isValidationVisible = true;
    }
  }

  ngOnChanges(): void {}

  setValidationFields = (type: FieldType) => {
    this.validationKeys = validationFactory.getValidationFields(type);
  };

  onChange = () => {
    this.fieldService.updateFormField(this.field);
  };

  onRemove = (id: string) => {
    this.field.removeOption(id);
    this.fieldService.updateFormField(this.field);
  };

  onAdd = () => {
    this.field.addOption(new Option({ fieldId: this.field.id }));
    this.fieldService.updateFormField(this.field);
  };

  onToggleValidation = (checked: boolean) => {
    this.isValidationVisible = checked;

    if (!checked) {
      this.field.clearValidation();
    }
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
}
