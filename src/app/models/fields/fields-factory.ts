import { SelectField, SelectFieldBase } from './select';
import { CheckBoxField, CheckBoxFieldBase } from './checkbox';
import { InputField, InputFieldBase } from './input';
import { RadioField, RadioFieldBase } from './radio';

const fields = {
  input: InputField,
  checkbox: CheckBoxField,
  select: SelectField,
  radio: RadioField,
};

const fieldsBase = {
  input: InputFieldBase,
  checkbox: CheckBoxFieldBase,
  select: SelectFieldBase,
  radio: RadioFieldBase,
};

export class FieldFactory {
  constructor() {}

  static create = (type: FieldBase['type'], params: Partial<SingleFieldBase | MultiFieldBase>): Field => {
    const Field = fields[type];
    return new Field(params as any);
  };

  static createBase = (
    type: FieldBase['type'],
    params: Partial<SingleFieldBase | MultiFieldBase>
  ): SingleFieldBase | MultiFieldBase => {
    const Field = fieldsBase[type];
    return new Field(params as any);
  };
}
