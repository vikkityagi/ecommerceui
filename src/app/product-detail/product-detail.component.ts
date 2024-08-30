import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  productData: any;

  constructor(private datasharingService: DataSharingService){

    this.getProduct();
  }

  ngOnInit(): void {
  }

  getProduct(){
    this.datasharingService.currentData.subscribe(data=>{
      this.productData = data;
      console.log('product data: '+this.productData)
    })
  }



}
