class ValidationFactory {
  validation: ValidationKeys[] = [
    'required',
    'min',
    'max',
    'maxLength',
    'minLength',
    // 'oneOf',
    // 'exact',
    // 'email',
    // 'range',
    // 'url',
  ];

  errorMessages: Record<ValidationKeys, (value: any) => string> = {
    email: () => '',
    max: (value: any) => `Максимальне значення: ${value}`,
    maxLength: (value: any) => `Максимальне кількість символів: ${value}`,
    minLength: (value: any) => `Мінімальна кількість символів: ${value}`,
    min: (value: any) => `Мінімальна значення: ${value}`,
    required: () => `Поле є обов'язковим`,
  };

  keyTitle: Record<ValidationKeys, string> = {
    email: 'Коректність Email',
    max: 'Максимальне значення',
    maxLength: 'Максимальна кількість символів',
    min: 'Мінімальне значення',
    minLength: 'Мінімальнa кількість символів',
    required: "Обов'язкове поле",
  };

  fieldValidation: Record<FieldType, ValidationKeys[]> = {
    input: [],
    checkbox: ['required'],
    radio: ['required'],
    select: ['required'],
  };

  inputTypeValidation: Record<InputType, ValidationKeys[]> = {
    email: ['required', 'email'],
    number: ['required', 'min', 'max'],
    phone: ['required'],
    text: ['required', 'minLength', 'maxLength'],
  };

  constructor() {}

  getValidationFields = (type: FieldType) => {
    return this.fieldValidation[type];
  };

  getInputValidation = (type: InputType) => {
    return this.inputTypeValidation[type];
  };

  getKeyTitle = (key: ValidationKeys) => {
    return this.keyTitle[key];
  };
}

export const validationFactory = new ValidationFactory();
