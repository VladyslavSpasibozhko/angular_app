import { v4 as uuidv4 } from 'uuid';
import { Validation } from '../validation/validation';

export class InputFieldBase implements SingleFieldBase {
  readonly id: string = '';
  readonly type = 'input';
  public short = true;
  public title: string = '';
  public description: string = '';
  public inputType: 'text' | 'phone' | 'email' | 'number' = 'text';
  public validation: IValidationBase[] = [];

  constructor({
    id = uuidv4(),
    short = true,
    description = '',
    title = '',
    inputType = 'text',
    validation = [],
  }: Partial<SingleField>) {
    this.id = id;
    this.description = description;
    this.title = title;
    this.short = short;
    this.validation = validation;
    this.inputType = inputType;
  }
}

export class InputField extends InputFieldBase implements SingleField {
  override validation: IValidation[] = [];

  constructor({ validation = [], ...data }: Partial<SingleField>) {
    super(data);
    this.validation = validation.map((el) => new Validation(el));
  }

  changeShort = (value: boolean) => {
    this.short = value;
  };

  changeDescription = (value: string) => {
    this.description = value;
  };

  changeTitle = (value: string) => {
    this.title = value;
  };

  changeInputType = (value: InputType) => {
    this.inputType = value;
  };

  addValidation = (data: IValidation) => {
    this.validation = this.validation.concat(data);
  };

  updateValidation = (data: IValidation) => {
    this.validation = this.validation.map((v) => (v.key === data.key ? data : v));
  };

  removeValidation = (key: string) => {
    this.validation = this.validation.filter((v) => v.key !== key);
  };

  clearValidation = () => {
    this.validation = [];
  };
}
