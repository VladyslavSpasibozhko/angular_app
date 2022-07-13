import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControllerBase } from 'src/app/models/form';
import { FieldService } from 'src/app/services/field.service';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  id: string = '';
  fields: Field[] = [];
  title: string = '';
  description: string = '';
  subscriptions: Subscription[] = [];

  constructor(
    private fieldService: FieldService,
    private formService: FormsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const fieldSubscription = this.fieldService.fields.subscribe((value) => {
      this.fields = value;
    });

    const formSubscription = this.formService.editForm.subscribe((value) => {
      if (value) {
        this.description = value.description || '';
        this.title = value.title;
        this.id = value.id;

        this.fieldService.setFormFields(value.fields);
      }
    });

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.formService.setEditForm(id);
      }
    });

    this.subscriptions.push(formSubscription);
    this.subscriptions.push(fieldSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.formService.clearEditForm();
    this.fieldService.clearFormFields();
  }

  onAdd = () => {
    this.fieldService.addFormField();
  };

  onSave = () => {
    const form = new FormControllerBase({
      id: this.id,
      fields: this.fields,
      title: this.title,
      description: this.description,
    });

    this.formService.updateForm(form);
    this.formService.saveForms();

    this.router.navigate(['main']);
  };

  onExit = () => {
    this.location.back();
  };
}
