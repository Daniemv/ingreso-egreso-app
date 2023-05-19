import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((state) => {
        if (!state) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    )
  }

}
