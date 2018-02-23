import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errMessage = '';

  constructor(private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.getAccount() !== null) {
      this.router.navigate(['/home']);
    }
  }

  onLogin(email: string, password: string) {
    this.authService
      .login(email, password)
      .subscribe(res => {
        this.authService.authenticate(res.token);
        this.router.navigate(['/home']);
      }, err => {
        this.errMessage = err.error.message;
        console.error(err);
      });
  }
}

interface ILoginResponse {
  token: string;
}
