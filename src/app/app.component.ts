import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, Event, ActivationStart, NavigationEnd } from '@angular/router';
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
  constructor(private router: Router, public authService: AuthService, public breakpointObserver: BreakpointObserver) {
   }
  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 1150px)', '(max-height:600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showContainer = true;
        } else {
          this.showContainer = false;
        }
      });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.selected = {};
        this.selected[event.url.substring(1, event.url.length)] = true;
        this.username = this.authService.isAuthenticated() ? JSON.parse(localStorage.getItem('userInfo')).user : '';
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
