import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Account} from './models/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  getAccount(): Account {
    return this.authService.getAccount();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['home'])
      .catch(reason => console.log('Erreur de redirection: ', reason));
  }
}
