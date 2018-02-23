import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message = '';
  isError = false;

  constructor(private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.getAccount() !== null) {
      this.router.navigate(['/home']);
    }
  }

  onRegister(email: string, password: string, confirmPassword: string, pseudo: string,
    firstname: string, lastname: string, address: string, IBAN: string) {
    if (confirmPassword === password) {
      this.authService
        .register(email, password, pseudo, firstname, lastname,
          address, IBAN)
        .subscribe(() => {
          this.showSuccess('Your account has been created!');
          setTimeout(() => this.router.navigate(['/']), 1000);
        }, err => {
          this.showError(err.error.message);
          console.error(err);
        });
    } else {
      this.message = 'Password mismatch.';
      this.isError = true;
    }
  }

  private showError(message: string): void {
    this.message = message;
    this.isError = true;
  }

  private showSuccess(message: string): void {
    this.message = message;
    this.isError = false;
  }
}
