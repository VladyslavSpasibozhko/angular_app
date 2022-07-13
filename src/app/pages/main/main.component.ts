import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  forms: FormBase[] = [];

  constructor(private formService: FormsService, private router: Router) {}

  ngOnInit(): void {
    this.formService.forms.subscribe((value) => {
      this.forms = value;
    });
  }

  onEditForm = (id: string) => {
    this.router.navigate(['edit', id]);
  };

  onViewForm = (id: string) => {
    this.router.navigate(['view', id]);
  };

  onCreate = () => {
    this.router.navigate(['create']);
  };

  onRemove = (id: string) => {
    this.formService.removeForm(id);
    this.formService.saveForms();
  };
}
