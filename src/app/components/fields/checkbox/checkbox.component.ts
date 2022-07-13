import { Component, Input, OnInit } from '@angular/core';
import { Option } from 'src/app/models/option/option';
import { FieldService } from 'src/app/services/field.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() data!: { option: Option; canDelete: boolean; change: () => void; remove: (value: string) => void };

  constructor(private fieldService: FieldService) {}

  ngOnInit(): void {}

  onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.data.option.changeLabel(target.value);
    this.data.change();
  };

  onDelete = () => {
    this.data.remove(this.data.option.value);
  };
}
