import { ComponentType } from '@angular/cdk/portal';
import { Directive, EventEmitter, Input, OnChanges, Output, ViewContainerRef } from '@angular/core';
import { Option } from 'src/app/models/option/option';
import { CheckboxComponent } from 'src/app/components/fields/checkbox/checkbox.component';
import { TextComponent } from 'src/app/components/fields/text/text.component';
import { SelectComponent } from 'src/app/components/fields/select/select.component';
import { RadioComponent } from 'src/app/components/fields/radio/radio.component';

@Directive({
  selector: '[appOption]',
})
export class OptionDirective implements OnChanges {
  @Input() canDelete!: boolean;
  @Input() option!: Option;
  @Input() index!: number;
  @Input() type!: FieldBase['type'];
  @Output() change = new EventEmitter();
  @Output() remove = new EventEmitter<string>();

  constructor(private vcr: ViewContainerRef) {}

  clear = () => {
    this.vcr.clear();
  };

  append = () => {
    let component: ComponentType<any> = TextComponent;

    if (this.type === 'checkbox') {
      component = CheckboxComponent;
    }

    if (this.type === 'radio') {
      component = RadioComponent;
    }

    if (this.type === 'select') {
      component = SelectComponent;
    }

    const optionComponent = this.vcr.createComponent(component);
    optionComponent.instance.data = {
      index: this.index + 1,
      option: this.option,
      canDelete: this.canDelete,
      change: () => this.change.emit(),
      remove: (value: string) => this.remove.emit(value),
    };
  };

  ngOnChanges() {
    this.clear();
    this.append();
  }
}
