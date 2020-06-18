import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from '../helpers.service';
import { validate } from 'json-schema';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Input() placeholder = '';
  @Input() label = '';
  @Input() password = false;
  @Input() value = '';
  @Input() invokeMethod = '';
  @Input() full = false;
  @Input() messages = '';
  messageToShow = '';
  @Input() validations = '';
  validationsArray: string[] = [];
  messagesArray: string[] = [];
  @Input() alt = '';

  constructor(private helpersService: HelpersService) {
  }

  ngOnInit() {
    this.validationsArray = this.validations.split(',');
    this.messagesArray = this.messages.split(',');
  }

  validate() {
    if (this.invokeMethod === 'validateLogin') {
      if (this.value === '' && this.validationsArray.includes('required')) {
        this.messageToShow = this.messagesArray[0];
        this.helpersService.fieldsLoginSet.delete(this.alt);
      } else {
        this.messageToShow = '';
        this.helpersService.fieldsLoginSet.add(this.alt);
      }
    } else if (this.invokeMethod === 'validateRegister') {
      if (this.value === '' && this.validationsArray.includes('required')) {
        this.messageToShow = this.messagesArray[0];
        this.helpersService.fieldsLoginSet.delete(this.alt);
      } else {
        this.messageToShow = '';
        this.helpersService.fieldsLoginSet.add(this.alt);
      }
    }
    else {
      if (this.value === '' && this.validationsArray.includes('required')) {
        this.messageToShow = this.messagesArray[0];
        this.helpersService.fieldsSet.delete(this.alt);
      } else {
        this.messageToShow = '';
        this.helpersService.fieldsSet.add(this.alt);
      }
    }
  }

}
