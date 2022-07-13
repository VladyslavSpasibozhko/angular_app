import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() data!: {
    index: number;
    option: IOption;
    canDelete: boolean;
    change: () => void;
    remove: (value: string) => void;
  };

  constructor() {}

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
