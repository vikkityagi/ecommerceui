import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private data = new BehaviorSubject<any>(null);
  currentData = this.data.asObservable();

  constructor() { }

  sendData(data: any) {
    this.data.next(data);
  }
}
