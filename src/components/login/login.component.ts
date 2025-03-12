import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {  AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatLabel } from '@angular/material/form-field'; 



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, MatCardModule,MatLabel, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: any;


  constructor(private authService:AuthService,private router:Router) {
  }
submitForm() {
const userData = this.myForm.getRawValue();
this.authService.login(userData).subscribe({
  next: (response) => {
    sessionStorage.setItem('myToken',response.token)
    sessionStorage.setItem('role',response.role)
    sessionStorage.setItem('userId',response.userId)
    this.router.navigate(['/home-Page'])
  },
  error: (error) => {
  }
});
}

change() {
this.isLogin=true
}

  isLogin:boolean=false

    myForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')

    });
current:any

}
