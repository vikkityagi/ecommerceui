import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(private httpClient: HttpClient,private envrionment:Environment) {
    
   }

   getCategories(): Observable<any>{
    return this.httpClient.get<any>(`${this.envrionment.apiUrl}/categories`).pipe(catchError(err=>this.catchAuthError(err)));
   }


   catchAuthError(error: any): Observable<any> {
    if(error.error && error.error.message){
      console.log(error.error.message);
    }else if(error && error.message){
      console.log(error.message);
    }else {
      console.log(JSON.stringify(error));
    }
    return throwError(error);
  }
}
