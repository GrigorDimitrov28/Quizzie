import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent{
  isLogged$ = this.authService.isLogged$;
  currentUser$ = this.authService.currentUser$;

  url: string;

  constructor(private authService: AuthService, private router: Router) {
    authService.authenticate();
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.url = e.url;
      });
  }
}
