export class ValidationBase implements IValidationBase {
  key: ValidationKeys;
  message?: string;
  value: any;

  constructor({ key, message, value }: IValidationBase) {
    this.key = key;
    this.message = message;
    this.value = value;
  }
}

export class Validation extends ValidationBase implements IValidation {
  constructor(data: IValidationBase) {
    super(data);
  }

  changeMessage = (value: string) => {
    this.message = value;
  };

  changeValue = (value: any) => {
    this.value = value;
  };
}
