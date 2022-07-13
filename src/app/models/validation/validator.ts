import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { validationFactory } from './validation-factory';

export class Validator {
  data: IValidationBase;
  constructor(data: IValidationBase) {
    this.data = { ...data, message: data.message ? data.message : validationFactory.getKeyTitle(data.key) };
  }
}

export class ValidatorRequired extends Validator implements IValidator {
  constructor(data: IValidationBase) {
    super(data);
  }

  validate = (control: AbstractControl): ValidationErrors | null => {
    const errors = Validators.required(control);
    if (errors) {
      return { [this.data.key]: this.data.message };
    }

    return null;
  };
}

export class ValidatorMin extends Validator implements IValidator {
  constructor(data: IValidationBase) {
    super(data);
  }

  validate = (control: AbstractControl): ValidationErrors | null => {
    const errors = Validators.min(this.data.value)(control);
    if (errors) {
      return { [this.data.key]: this.data.message };
    }

    return null;
  };
}

export class ValidatorMax extends Validator implements IValidator {
  constructor(data: IValidationBase) {
    super(data);
  }

  validate = (control: AbstractControl): ValidationErrors | null => {
    const errors = Validators.max(this.data.value)(control);
    if (errors) {
      return { [this.data.key]: this.data.message };
    }

    return null;
  };
}

export class ValidatorMaxLength extends Validator implements IValidator {
  constructor(data: IValidationBase) {
    super(data);
  }

  validate = (control: AbstractControl): ValidationErrors | null => {
    const errors = Validators.maxLength(this.data.value)(control);
    if (errors) {
      return { [this.data.key]: this.data.message };
    }

    return null;
  };
}

export class ValidatorMinLength extends Validator implements IValidator {
  constructor(data: IValidationBase) {
    super(data);
  }

  validate = (control: AbstractControl): ValidationErrors | null => {
    const errors = Validators.minLength(this.data.value)(control);

    if (errors) {
      return { [this.data.key]: this.data.message };
    }

    return null;
  };
}

export class ValidatorEmail extends Validator implements IValidator {
  constructor(data: IValidationBase) {
    super(data);
  }

  validate = (control: AbstractControl): ValidationErrors | null => {
    const errors = Validators.email(control.value);
    if (errors) {
      return { [this.data.key]: this.data.message };
    }

    return null;
  };
}

// export class ValidatorUrl extends Validator implements IValidator {
//   constructor(data: IValidationBase) {
//     super(data);
//   }

//   validate = (control: AbstractControl): ValidationErrors | null => {
//     if (typeof control.value === 'string') {
//       const result = control.value.search(URL);
//       return result === -1 ? { [this.data.key]: this.data.message } : null;
//     }

//     return { [this.data.key]: this.data.message };
//   };
// }

// export class ValidatorExact extends Validator implements IValidator {
//   constructor(data: IValidationBase) {
//     super(data);
//   }

//   validate = (control: AbstractControl): ValidationErrors | null => {
//     if (this.data.value === control.value) {
//       return null;
//     }
//     return { [this.data.key]: this.data.message };
//   };
// }

// export class ValidatorOneOf extends Validator implements IValidator {
//   constructor(data: IValidationBase) {
//     super(data);
//   }

//   validate = (control: AbstractControl): ValidationErrors | null => {
//     if (Array.isArray(this.data.value)) {
//       const isIncludes = this.data.value.includes(control.value);

//       if (isIncludes) {
//         return null;
//       }
//     }
//     return { [this.data.key]: this.data.message };
//   };
// }

// export class ValidatorRange extends Validator implements IValidator {
//   constructor(data: IValidationBase) {
//     super(data);
//   }

//   validate = (control: AbstractControl): ValidationErrors | null => {
//     const { from, to } = this.data.value;

//     if (from >= control.value && control.value <= to) {
//       return null;
//     }

//     return { [this.data.key]: this.data.message };
//   };
// }
