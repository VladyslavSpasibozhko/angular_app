import { v4 as uuidv4 } from 'uuid';

export class OptionBase implements IOptionBase {
  public label: string = '';
  readonly value: string = '';
  readonly fieldId: string = '';

  constructor({ fieldId = '', label = '', value = uuidv4() }: Partial<Option>) {
    this.fieldId = fieldId;
    this.label = label;
    this.value = value;
  }
}

export class Option implements IOption {
  public label: string = '';
  readonly value: string = '';
  readonly fieldId: string = '';

  constructor({ fieldId = '', label = '', value = uuidv4() }: Partial<Option>) {
    this.fieldId = fieldId;
    this.label = label;
    this.value = value;
  }

  changeLabel = (value: string) => {
    this.label = value;
  };
}
