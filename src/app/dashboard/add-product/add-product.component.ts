import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { GetProductComponent } from '../get-product/get-product.component';





@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, GetProductComponent],
  providers: [ProductService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  addForm: any = FormGroup;
  base64: any;

  constructor(private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {

    this.init();
    this.getPathVariable();
  }

  init() {
    this.addForm = this.fb.group({
      category_id: ['', [Validators.required]],
      sub_category_id: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      product_description: ['', [Validators.required]],
      product_price: ['', [Validators.required]],
      product_image: [''],
      product_image_base64: ['', Validators.required]
    })
  }

  getPathVariable() {
    this.activateRoute.params.subscribe(data => {
      this.addForm.get('category_id')?.setValue(data['categoryId']);
      this.addForm.get('sub_category_id')?.setValue(data['subcategoryId']);
    })
  }



  onImageChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.base64 = reader.result;


      this.addForm.patchValue({
        product_image_base64: (<string>reader.result)
      });

    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.addForm.valid) {
      alert("please check the complete form");
      return
    }

    this.productService.createProduct(this.addForm.value).subscribe(data => {
      alert("Product Add successfully")
      this.addForm.reset();
      this.base64 = null;

      this.router.navigate(['/products']);
    }, error => {
      this.router.navigate(['/error'])
    })
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        alert('Client Error: ' + error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`
        );
        alert('Http Error: ' + error.message);
      }
    } else {
      // A different error occurred.
      console.error('An error occurred:', error);
      alert('Error: ' + error);
    }
  }

}
