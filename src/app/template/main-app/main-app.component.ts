import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements OnInit {
  authenticated = false;

  constructor() {
  }

  title = 'AngFront';

  ngOnInit(): void {
    // Emitters.authEmitter.subscribe((auth: boolean) => {
    //   this.authenticated = auth;
    // });
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.add('sidebar-mini');
  }
}
