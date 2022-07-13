import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-validation-multi',
  templateUrl: './validation-multi.component.html',
  styleUrls: ['./validation-multi.component.scss'],
})
export class ValidationMultiComponent implements OnInit {
  @Input() field!: IValidation;
  @Output() updateField = new EventEmitter<IValidation>();

  constructor() {}

  ngOnInit(): void {}

  onChangeMessage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.field.changeMessage(target.value);

    this.updateField.emit(this.field);
  };
}
