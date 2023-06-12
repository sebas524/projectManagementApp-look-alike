import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  isLoggedInSubs: Subscription | undefined;

  ngOnInit(): void {
    this.isLoggedInSubs = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        if (isLoggedIn) {
          // this.router.navigateByUrl('/pm/boards');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.isLoggedInSubs?.unsubscribe();
  }
}
