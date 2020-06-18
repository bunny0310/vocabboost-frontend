import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, Event, ActivationStart } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from './auth.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'frontend';
  isCurrent = true;
  username = this.authService.isAuthenticated() ? JSON.parse(localStorage.getItem('userInfo')).user : '';
  selected: any = {};
  showContainer = false;
  constructor(private router: Router, public authService: AuthService, public breakpointObserver: BreakpointObserver) { }
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

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}
