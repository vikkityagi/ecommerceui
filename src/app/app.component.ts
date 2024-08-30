import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DataSharingService } from './data-sharing.service';
import { CommonModule } from '@angular/common';
import { GetProductComponent } from './dashboard/get-product/get-product.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'eCom';
  showDashboard: boolean = false;
  private distroySubject: Subject<void> = new Subject();
  

  constructor(private dataSharing: DataSharingService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.getDataFromDataSharingService();
  }

  getDataFromDataSharingService() {
    this.dataSharing.currentData.subscribe(data => {
      this.showDashboard = data;
    })

    
  }

  onClickDashboard() {
    // this.router.navigate(['/dashboard/',localStorage.getItem('categoryId')/localStorage.getItem('subcategoryId')]);
    this.router.navigate(['/dashboard', localStorage.getItem('categoryId'), localStorage.getItem('subcategoryId')]);

  }
}
