import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductComponent } from './get-product/get-product.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GetProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  categoryId: any;
  subcategoryId: any;

  constructor(private router: Router,
    private activateRoute: ActivatedRoute
  ){

    this.getPathVariable();
    
  }

  addProduct(){
    this.router.navigate(['/add-product',this.categoryId,this.subcategoryId]);
  }

  removeProduct(){
    this.router.navigate(['/remove-product',this.categoryId,this.subcategoryId]);
  }

  getPathVariable(){
    this.activateRoute.params.subscribe(data=>{
      this.categoryId = data['categoryId'];
      this.subcategoryId = data['subcategoryId'];
    })
  }

}
