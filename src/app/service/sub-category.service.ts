import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Environment } from '../environment';

@Injectable()
export class SubCategoryService {

  constructor(private httpClient: HttpClient, private environment: Environment) { }

  getSubCategoryById(id: any): Observable<any> {
    return this.httpClient.get<any>(`${this.environment.apiUrl}/sub_category/${id}`).pipe(catchError(err => this.catchAuthError(err)));
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
