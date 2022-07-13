import { v4 as uuidv4 } from 'uuid';
import { FieldFactory } from './fields/fields-factory';

export class FormController implements Form {
  readonly id: string = '';
  public fields: Field[] = [];
  public title: string = '';
  public description: string = '';

  constructor({ id = uuidv4(), fields = [], title = '', description = '' }: Partial<FormBase>) {
    this.id = id;
    this.fields = fields.map((field) => FieldFactory.create(field.type, field));
    this.title = title;
    this.description = description;
  }
}

export class FormControllerBase implements FormBase {
  readonly id: string = '';
  public fields: Array<SingleFieldBase | MultiFieldBase> = [];
  public title: string = '';
  public description: string = '';

  constructor({ id = uuidv4(), fields = [], title = '', description = '' }: Partial<FormBase>) {
    this.id = id;
    this.fields = fields.map((field) => FieldFactory.createBase(field.type, field));
    this.title = title;
    this.description = description;
  }
}
