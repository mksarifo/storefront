import { Component } from '@angular/core';
import {Login} from "../../../domain/Login";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  login: Login = new Login(
    "",
    "",
    false
  )

  authenticationError = false
  loginAlert = false

  authenticate() {
    this.authService.login(this.login).subscribe(
      {
        next: () => {
          this.authenticationError = false;
          this.loginAlert = true
          setTimeout(() => this.router.navigate(['/cart']), 2000);
        },
        error: () => (this.authenticationError = true),
      }
    )
  }
}
