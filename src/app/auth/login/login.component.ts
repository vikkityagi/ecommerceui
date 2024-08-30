import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GetProductComponent } from '../../dashboard/get-product/get-product.component';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, GetProductComponent],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  forgotPassword: boolean = false;
  isUserLogin!: boolean;

  constructor(private fb: FormBuilder, private router: Router,private service: AuthService) {

    this.init();

  }

  ngOnInit(): void {
      this.isUserLogin!;
  }

  private init() {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })

  }

  public changePassword() {
    this.forgotPassword = true;
  }

  loginUserOrAdmin(event: any) {
    if (event.target.value == 1)
      this.isUserLogin = true
    else
      this.isUserLogin = false
  }

  login() {
    if(this.loginForm.valid){
      if (!this.isUserLogin && this.isUserLogin != undefined) {
        this.router.navigate(['/category']);
        return;
      }
      else if (this.isUserLogin && this.isUserLogin != undefined) {
        this.service.login(this.loginForm.value).subscribe({
          next:data=>{
            const body = data.body;
            if(data.status === 200 && body.user_name != null && body.email != null){
              this.router.navigate(['/products'])
            }
          },
          error: error=>{
            if(error.message === "Function not implemented."){
              alert("Data not found");
            }
          }
        })
       
      }else{
        alert("please choose which user want to login..")
      }
    }else{
      alert('Please fill the detail..')
    }
   
  }
  
}
