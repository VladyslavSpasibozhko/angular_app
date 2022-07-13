import { AbstractControl, ValidationErrors } from '@angular/forms';

declare global {
  type ValidationKeys =
    | 'min'
    | 'max'
    | 'minLength'
    | 'maxLength'
    | 'required'
    // | 'range'
    | 'email';
  // | 'url'
  // | 'phone'
  // | 'exact'
  // | 'oneOf';

  interface IValidationBase {
    key: ValidationKeys;
    value: any;
    message?: string;
  }

  interface IValidation extends IValidationBase {
    changeMessage: (value: string) => void;
    changeValue: (value: any) => void;
  }

  interface IValidator {
    data: IValidationBase;
    validate: (control: AbstractControl) => ValidationErrors | null;
  }
}
