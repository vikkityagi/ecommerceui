import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm:any = FormGroup;
  hidePassword:boolean = true;

  constructor(private fb:FormBuilder,private authService: AuthService){
    this.init();
  }

  private init(){
    this.signupForm = this.fb.group({
      user_name: ['',Validators.required],
      email:['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]]
    })
  }

  public togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  public signup(){
    if(this.signupForm.valid){
      this.authService.signup(this.signupForm.value).subscribe({
        next: data=>{
          if(data.status === 201){
            alert("User created successfully..")
            this.signupForm.reset();
          }else if(data.status === 200){
            if(data.body.email == null && data.body.user_name != null){
              alert("user name is duplicate");
              this.signupForm.get('user_name').reset();
            }else if(data.body.user_name == null && data.body.email != null){
              alert("email is duplicate");
              this.signupForm.get('email').reset();
            }else{
              alert("email and user name are duplicate");
              this.signupForm.get('email').reset();
              this.signupForm.get('user_name').reset();
            }
            
          }
         
        },
        error: error=>{
          alert(error);
        }
      })
    }else{
      alert("Please check the form...")
    }
  }

}
