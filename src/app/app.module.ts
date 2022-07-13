import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldPanelComponent } from './components/field-panel/field-panel.component';
import { CheckboxComponent } from './components/fields/checkbox/checkbox.component';
import { TextComponent } from './components/fields/text/text.component';
import { SelectComponent } from './components/fields/select/select.component';
import { RadioComponent } from './components/fields/radio/radio.component';
import { FieldOptionsComponent } from './components/field-options/field-options.component';
import { ContainerDirective } from './directives/container.directive';
import { OptionDirective } from './directives/option.directive';
import { MainComponent } from './pages/main/main.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ViewComponent } from './pages/view/view.component';
import { FieldValidationComponent } from './components/field-validation/field-validation.component';
import { ValidationInputComponent } from './components/validations/validation-input/validation-input.component';
import { ValidationMultiComponent } from './components/validations/validation-multi/validation-multi.component';
import { ElementDirective } from './directives/element.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';

@NgModule({
  declarations: [
    AppComponent,
    FieldPanelComponent,
    CheckboxComponent,
    TextComponent,
    SelectComponent,
    RadioComponent,
    FieldOptionsComponent,
    ContainerDirective,
    OptionDirective,
    MainComponent,
    CreateComponent,
    EditComponent,
    ViewComponent,
    FieldValidationComponent,
    ValidationInputComponent,
    ValidationMultiComponent,
    ElementDirective,
    ScrollToDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
