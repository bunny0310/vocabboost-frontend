import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-home-page',
  templateUrl: './mobile-home-page.component.html',
  styleUrls: ['./mobile-home-page.component.css']
})
export class MobileHomePageComponent implements OnInit {

  @Input() data = [];
  constructor() { }

  ngOnInit(): void {
  }

}
