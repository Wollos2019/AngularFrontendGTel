import { Injectable, Injector } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthServiceService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.userValue) {
      const { token } = this.authService.userValue;

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.logout();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

  // constructor(private injector: Injector) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let authService = this.injector.get(AuthServiceService)
  //   console.log(authService.getToken());
  //     let tokenizedReq = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${authService.getToken()}`
  //       }
  //     })
  //     console.log(tokenizedReq);
  //     return next.handle(tokenizedReq)
  // }
}
