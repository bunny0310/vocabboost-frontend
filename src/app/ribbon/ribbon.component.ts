import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from '../helpers.service';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {

  @Input() title = '';
  constructor(public helpersService: HelpersService) { }

  ngOnInit() {
  }

}
