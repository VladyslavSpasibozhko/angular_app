interface FieldBase {
  id: string;
  type: FieldType;
}

interface SingleFieldBase extends FieldBase {
  readonly id: string;
  readonly type: 'input';
  short: boolean;
  title: string;
  description?: string;
  inputType: InputType;
  validation: IValidationBase[];
}

interface SingleField extends SingleFieldBase {
  validation: IValidation[];

  changeShort: (value: boolean) => void;
  changeDescription: (value: string) => void;
  changeTitle: (value: string) => void;
  changeInputType: (value: InputType) => void;

  addValidation: (validation: IValidation) => void;
  removeValidation: (key: string) => void;
  updateValidation: (validation: IValidation) => void;
  clearValidation: () => void;
}

interface MultiFieldBase extends FieldBase {
  readonly id: string;
  readonly type: 'checkbox' | 'radio' | 'select';
  options: IOptionBase[];
  title: string;
  description?: string;
  validation: IValidationBase[];
}

interface MultiField extends MultiFieldBase {
  options: IOption[];
  validation: IValidation[];

  addOption: (option: IOption) => void;
  addOptions: (options: IOption[]) => void;
  removeOption: (optionId: string) => void;
  changeDescription: (value: string) => void;
  changeTitle: (value: string) => void;

  addValidation: (validation: IValidation) => void;
  removeValidation: (key: string) => void;
  updateValidation: (validation: IValidation) => void;
  clearValidation: () => void;
}

type Field = SingleField | MultiField;

interface FormBase {
  readonly id: string;
  title: string;
  description?: string;
  fields: Array<SingleFieldBase | MultiFieldBase>;
}

interface Form {
  readonly id: string;
  title: string;
  description?: string;
  fields: Field[];
}
