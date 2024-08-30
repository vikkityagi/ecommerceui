import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,private envrionment:Environment) { }

  signup(value: any): Observable<any>{
    return this.httpClient.post(`${this.envrionment.apiUrl}/userResources`,value,{ observe: 'response' }).pipe(catchError(err=> this.catchAuthError(err)));
  }

  login(value: any): Observable<any>{
    return this.httpClient.post(`${this.envrionment.apiUrl}/login`,value,{ observe: 'response' }).pipe(catchError(err=> this.catchAuthError(err)));
  }

  private catchAuthError(error: any): Observable<any> {
    let errorMessage: string;
    if (error.error && error.error.message) {
      errorMessage = `Exception occurred: ${error.error.message}`;
    } else if (error.message) {
      errorMessage = `Exception occurred: ${error.message}`;
    } else {
      errorMessage = `Exception occurred: ${error}`;
    }
    console.error(errorMessage); // Log the error for debugging
    return throwError(errorMessage); // Throw the error as an observable
  }
}
function throwError(errorMessage: string): Observable<any> {
  throw new Error('Function not implemented.');
}

