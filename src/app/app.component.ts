import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessagesService, SpinnerService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngTaskManager';
  constructor(
    private router: Router,
    public messagesService: MessagesService,
    public spinnerService: SpinnerService
  ) { }

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
}
