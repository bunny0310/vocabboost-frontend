import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, Event, ActivationStart } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'frontend';
  isCurrent = true;
  selected: any = {};
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationStart) {
        console.log(event.snapshot);
        const e = event.snapshot.component as {name: string};
        this.selected[e.name] = true;
      }
    });
  }

  ngOnChanges() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationStart) {
        console.log(event.snapshot);
        const e = event.snapshot.component as {name: string};
        this.selected[e.name] = true;
      }
    });
  }
}
