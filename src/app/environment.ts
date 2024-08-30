import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root' // This makes the service available throughout the app
  })
export class Environment {
    apiUrl: string = 'http://localhost:8080/api/v1';
}