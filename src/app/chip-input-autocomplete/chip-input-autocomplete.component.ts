import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { HelpersService } from '../helpers.service';

@Component({
  selector: 'app-chip-input-autocomplete',
  templateUrl: './chip-input-autocomplete.component.html',
  styleUrls: ['./chip-input-autocomplete.component.css']
})
export class ChipInputAutocompleteComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  formCtrl = new FormControl();
  data: string[] = [];
  @Input() allData: string[];
  @Input() full = false;
  @Input() messages = '';
  messageToShow = '';
  @Input() alt = '';
  @Input() validations = '';
  validationsArray: string[] = [];
  messagesArray: string[] = [];


  @ViewChild('Input') Input: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private helpersService: HelpersService) {
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const v = (value || '').trim();
    // Add our fruit
    if (v && this.allData.includes(v)) {
      console.log('jake amy');
      this.data.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.data.indexOf(fruit);

    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.helpersService.includesString(event.option.viewValue, this.data)) {
      this.data.push(event.option.viewValue);
      this.Input.nativeElement.value = '';
      this.formCtrl.setValue(null);
    }
  }

  validate() {
    if (this.data.length === 0 && this.validationsArray.includes('required')) {
      this.messageToShow = this.messagesArray[0];
      this.helpersService.fieldsSet.delete(this.alt);
    } else {
      this.messageToShow = '';
      this.helpersService.fieldsSet.add(this.alt);
    }
  }

  ngOnInit() {
    this.validationsArray = this.validations.split(',');
    this.messagesArray = this.messages.split(',');
  }

}
