import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../../data-sharing.service';

@Component({
  selector: 'app-get-product',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers: [ProductService,DataSharingService],
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.css'
})
export class GetProductComponent implements OnInit {

  productList: any[] = [];

  constructor(private productService: ProductService,
    private dataSharingService: DataSharingService,
    private router: Router
  ) {
      
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProduct().subscribe((data: []) => {
      this.productList = data;
      console.log(this.productList)
    }, error => {
      this.router.navigate(['/error']);
    })
  }

  getDetail(product: any){

    this.dataSharingService.sendData(product);
    setTimeout(()=>{

      this.router.navigate(['/product_detail']);
   },5000)
  }

}
