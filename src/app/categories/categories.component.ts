import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category, myEnumMap } from './enum/Category';
import { HttpClientModule } from '@angular/common/http';
import { SubCategoryService } from '../service/sub-category.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [CategoryService, SubCategoryService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {





  categoryList: any[] = [];
  subcategoryList: any[] = [];

  // it is used to when click on category then gives the border
  selectedCategoryId: any;


  constructor(private categoryService: CategoryService,
    private subaCategoryService: SubCategoryService,
    private dataSharingService: DataSharingService) {

  }




  ngOnInit(): void {
    this.getCategories();
  }

  getCategoryImagePath(categoryId: number): string {
    return myEnumMap[categoryId].imagePath;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data;
    })
  }

  getImageClicked(subcategory: any[]) {
    console.log("click")
    this.subcategoryList = subcategory;
  }

  // it is used to when click on category then gives the border
  selectedCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

  selectedSubCategory(event: any) {
    const selectedSubcategoryId = event.target.value;
    this.loadDataSelectedSubCategory(selectedSubcategoryId);
  }

  loadDataSelectedSubCategory(id: any) {
    this.subaCategoryService.getSubCategoryById(id).subscribe(data => {
      if (data != null) {
        const subCategoryId = data.id;
        const categoryId = data.category_id;
        localStorage.setItem("categoryId",categoryId);
        localStorage.setItem("subcategoryId",subCategoryId);
        this.dataSharingService.sendData(true);

      }
    })
  }

  // it is used to when click on category then gives the border
  isCategorySelected(categoryid: number) {
    return this.selectedCategoryId == categoryid;
  }



}
