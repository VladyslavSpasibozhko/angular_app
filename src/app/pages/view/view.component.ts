import { map } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { validatorFactory } from 'src/app/models/validation/validator-factory';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  form: FormBase | null = null;
  formGroup: FormGroup | null = null;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const formSubscription = this.formService.viewForm.subscribe((value) => {
      if (value) {
        this.form = value;
        this.formGroup = this.generateFormGroup(value);
      }
    });

    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      if (id) {
        this.formService.setViewForm(id);
      } else {
        this.router.navigate(['main']);
      }
    });

    this.subscriptions.push(formSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.formService.clearEditForm();
  }

  isTouched = (id: string) => {
    return Boolean(this.formGroup?.get(id)?.touched);
  };

  isError = (id: string) => {
    return this.formGroup?.get(id)?.hasError;
  };

  errorMessage = (id: string) => {
    const errors = this.formGroup?.get(id)?.errors;

    if (errors) {
      return Object.values(errors)[0];
    }

    return '';
  };

  generateFormGroup = (form: FormBase) => {
    const controls = form.fields.reduce(
      (prev, current) => ({
        ...prev,
        [current.id]: new FormControl(
          '',
          current.validation.map((validation) => validatorFactory.createValidator(validation))
        ),
      }),
      {}
    );

    return new FormGroup(controls);
  };

  onSubmit = () => {
    console.log(this.formGroup);
    console.log(this.form);
  };

  onCancel = () => {
    this.location.back();
  };

  // CHECKBOXES
  isChecked = (id: string, optionId: string) => {
    const formGroup = this.formGroup as FormGroup;
    const checkbox = formGroup.get(id);

    if (checkbox) {
      const isArray = Array.isArray(checkbox.value);

      if (isArray) {
        return checkbox.value.includes(optionId);
      }
    }

    return false;
  };

  onChangeCheckbox = (id: string, optionId: string) => {
    const formGroup = this.formGroup as FormGroup;
    const checkbox = formGroup.get(id);

    if (checkbox) {
      const isArray = Array.isArray(checkbox.value);

      if (isArray) {
        const isIncludes = checkbox.value.includes(optionId);

        checkbox.setValue(
          isIncludes ? checkbox.value.filter((id) => id !== optionId) : checkbox.value.concat(optionId)
        );
        checkbox.markAsTouched();
      } else {
        checkbox.setValue([optionId]);
        checkbox.markAsTouched();
      }
    }
  };
}
