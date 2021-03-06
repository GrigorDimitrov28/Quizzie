import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  isLogged$ = this.authService.isLogged$;
  isReady$ = this.authService.isReady$;

  constructor(private authService: AuthService, private router: Router) {}

  logoutHandler(): void {
    localStorage.clear();
    this.authService.logout().subscribe(() => this.router.navigate(['/']));
  }

  ngOnDestroy(): void {}
}
