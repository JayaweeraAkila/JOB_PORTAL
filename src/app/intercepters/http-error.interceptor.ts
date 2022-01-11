import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let hasIndex = req.url.indexOf('0/api');
        if (hasIndex === -1) {
            return next.handle(req);
        }

        return next.handle(req)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {

                    let errorMessage = '';

                    if (error.error instanceof ErrorEvent) {

                        // client-side error

                        errorMessage = `Error: ${error.error.message}`;

                    } else {

                        // server-side error

                        if (error.status === 401 || error.status === 403) {
                            this.router.navigate(['/login'], {
                                queryParams: {
                                    redirectTo: document.location.pathname
                                }

                            });
                        }
                    }

                    return throwError(error);
                })

            );
    }



}