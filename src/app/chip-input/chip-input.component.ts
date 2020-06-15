import { Component, OnInit, Input } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { HelpersService } from '../helpers.service';


export interface Tag {
  tag: string;
}
@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css']
})
export class ChipInputComponent implements OnInit {

  tagsVisible = true;
  tagsSelectable = true;
  tagsRemovable = true;
  tagsAddOnBlur = true;
  @Input() full = false;
  @Input() placeholder = '';
  @Input() messages = '';
  messageToShow = '';
  @Input() alt = '';
  @Input() validations = '';
  validationsArray: string[] = [];
  messagesArray: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];
  constructor(private helpersService: HelpersService) { }

  ngOnInit() {
    this.validationsArray = this.validations.split(',');
    this.messagesArray = this.messages.split(',');
  }


  tagAdd(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim() && !this.helpersService.includesTag(value, this.tags)) {
      this.tags.push({tag: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  tagRemove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  validate() {
    if (this.tags.length === 0 && this.validationsArray.includes('required')) {
      this.messageToShow = this.messagesArray[0];
      this.helpersService.fieldsSet.delete(this.alt);
    } else {
      this.messageToShow = '';
      this.helpersService.fieldsSet.add(this.alt);
    }
  }

}
