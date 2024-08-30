import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: '',redirectTo: '/login',pathMatch: 'full'},
    // { path: '**', redirectTo: 'error' },
    // { path: 'home',component: LoginComponent},
    { path: 'login',loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) },
    { path: 'category', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent) },
    { path: 'dashboard/:categoryId/:subcategoryId', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'add-product/:categoryId/:subcategoryId', loadComponent: () => import('./dashboard/add-product/add-product.component').then(m => m.AddProductComponent) },
    { path: 'remove-product/:categoryId/:subcategoryId', loadComponent: () => import('./dashboard/remove-product/remove-product.component').then(m => m.RemoveProductComponent) },
    { path: 'error', loadComponent: () => import('./common-error/common-error.component').then(m => m.CommonErrorComponent) },
    { path: 'products', loadComponent: () => import('./dashboard/get-product/get-product.component').then(m => m.GetProductComponent) },
    { path: 'product_detail', loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
    
];
