import { ValidatorFn } from '@angular/forms';
import { ValidationBase } from './validation';
import {
  ValidatorEmail,
  ValidatorRequired,
  ValidatorMax,
  ValidatorMaxLength,
  ValidatorMin,
  ValidatorMinLength,
} from './validator';

export class ValidatorFactory {
  validators = {
    email: ValidatorEmail,
    max: ValidatorMax,
    maxLength: ValidatorMaxLength,
    min: ValidatorMin,
    minLength: ValidatorMinLength,
    required: ValidatorRequired,
  };

  constructor() {}

  createValidator = (data: ValidationBase): ValidatorFn => {
    const Validator = this.validators[data.key];
    return new Validator(data).validate;
  };
}

export const validatorFactory = new ValidatorFactory();
