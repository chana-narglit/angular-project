import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule], 
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  isSignIn: boolean = false;
  user: any;

  constructor(private authService: AuthService,private router:Router) {} // שימוש בשירות
  
  change() {
    this.isSignIn = true;
  }

  submitForm() {
    if (this.myForm.valid) {
      const userData = this.myForm.getRawValue();;
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          this.router.navigate(['/home-Page'])
          sessionStorage.setItem('myToken',response.token)
          sessionStorage.setItem('role',userData.role!)
          sessionStorage.setItem('userId',response.userId)
        },
        error: (error) => {
       console.log(error);
       
        }
      });
    }
  }

  myForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''), 
    role: new FormControl('')  
  });
}
