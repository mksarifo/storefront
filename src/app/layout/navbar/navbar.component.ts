import {Component, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  collapsed = true;
  @Input() cartCount = 0
  @Input() isLogged = false

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout()
    this.isLogged = false
  }
}
