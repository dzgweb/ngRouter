import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

// rxjs
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { MessagesService, SpinnerService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  title = 'ngTaskManager';

  constructor(
    private router: Router,
    public messagesService: MessagesService,
    public spinnerService: SpinnerService,
    private titleService: Title
  ) { }


  ngOnInit() {
    this.setPageTitles();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onActivate($event) {
    console.log('Activated Component', $event);
  }

  onDeactivate($event) {
    console.log('Deactivated Component', $event);
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }
  
  private setPageTitles() {
    this.sub = this.router.events
      .pipe(        
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(
         data => this.titleService.setTitle(data['title'])
      );
  } 
}
