import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
  MatDividerModule, MatCardModule, MatInputModule, MatFormFieldModule, MatChipsModule, MatAutocompleteModule, MatTableModule } from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { AddWordComponent } from './add-word/add-word.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChipInputComponent } from './chip-input/chip-input.component';
import { ChipInputAutocompleteComponent } from './chip-input-autocomplete/chip-input-autocomplete.component';
import { RibbonComponent } from './ribbon/ribbon.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormErrorComponent } from './form-error/form-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AddWordComponent,
    ChipInputComponent,
    ChipInputAutocompleteComponent,
    RibbonComponent,
    InputFieldComponent,
    FormErrorComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    HttpClientModule,
    MatDividerModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
