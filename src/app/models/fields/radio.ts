import { v4 as uuidv4 } from 'uuid';
import { Option, OptionBase } from '../option/option';
import { Validation } from '../validation/validation';

export class RadioFieldBase implements MultiFieldBase {
  readonly id: string = '';
  readonly type = 'radio';
  public options: IOptionBase[] = [];
  public validation: IValidationBase[] = [];
  public description: string = '';
  public title: string = '';

  constructor({ id = uuidv4(), options = [], description = '', title = '', validation = [] }: Partial<MultiField>) {
    this.id = id;
    this.options = options.map((option) => new OptionBase(option));
    this.description = description;
    this.title = title;
    this.validation = validation;
  }
}

export class RadioField extends RadioFieldBase implements MultiField {
  override options: IOption[] = [];
  override validation: IValidation[] = [];

  constructor({ options = [], validation = [], ...data }: Partial<MultiField>) {
    super(data);
    this.options = options.map((option) => new Option(option));
    this.validation = validation.map((validation) => new Validation(validation));
  }

  addOptions = (options: IOption[]) => {
    this.options = [...this.options, ...options];
  };

  addOption = (option: IOption) => {
    this.options = [...this.options, option];
  };

  removeOption = (optionId: string) => {
    this.options = this.options.filter((option) => option.value !== optionId);
  };

  changeDescription = (value: string) => {
    this.description = value;
  };

  changeTitle = (value: string) => {
    this.title = value;
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
