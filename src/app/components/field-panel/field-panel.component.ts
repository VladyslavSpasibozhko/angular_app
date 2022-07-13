import { isMultiField } from 'src/app/utils';
import { Component, Input, OnInit } from '@angular/core';
import { FieldFactory } from 'src/app/models/fields/fields-factory';
import { FieldService } from 'src/app/services/field.service';
import { Option } from 'src/app/models/option/option';
import { FIELD_TYPES } from 'src/app/consts';

@Component({
  selector: 'app-field-panel',
  templateUrl: './field-panel.component.html',
  styleUrls: ['./field-panel.component.scss'],
})
export class FieldPanelComponent implements OnInit {
  @Input() field!: Field;

  isDescriptionVisible: boolean = false;
  fieldTypes = FIELD_TYPES;

  constructor(private fieldService: FieldService) {}

  onChangeTitle = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.fieldService.updateFormField(Object.assign(this.field, { title: target.value }));
  };

  onChangeType = (value: FieldBase['type']) => {
    const field = FieldFactory.create(value, this.field);
    field.clearValidation();

    if (isMultiField(field)) {
      if (!field.options.length) {
        field.addOption(new Option({ fieldId: field.id }));
      }
    }

    this.fieldService.replaceField(field);
  };

  onToggleDescription = (checked: boolean) => {
    this.isDescriptionVisible = checked;

    if (!checked) {
      this.field.changeDescription('');
      this.fieldService.updateFormField(this.field);
    }
  };

  onChangeDescription = (value: string) => {
    this.field.changeDescription(value);
    this.fieldService.updateFormField(this.field);
  };

  onDelete = () => {
    this.fieldService.removeFormField(this.field.id);
  };

  ngOnInit(): void {
    if (this.field.description) {
      this.isDescriptionVisible = true;
    }
  }
}
