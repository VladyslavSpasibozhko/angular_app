import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControllerBase } from 'src/app/models/form';
import { FieldService } from 'src/app/services/field.service';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  fields: Field[] = [];
  title: string = '';
  description: string = '';

  subscriptions: Subscription[] = [];

  constructor(
    private fieldService: FieldService,
    private formService: FormsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const fieldSubscription = this.fieldService.fields.subscribe((fields) => {
      this.fields = fields;
    });

    this.subscriptions.push(fieldSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.fieldService.clearFormFields();
  }

  onAdd = () => {
    this.fieldService.addFormField();
  };

  onExit = () => {
    this.location.back();
  };

  onSave = () => {
    const form = new FormControllerBase({ fields: this.fields, title: this.title, description: this.description });
    this.formService.addForm(form);
    this.formService.saveForms();

    this.router.navigate(['main']);
  };
}
