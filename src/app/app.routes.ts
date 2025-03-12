import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { LoginComponent } from '../components/login/login.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { LessonComponent } from '../components/lesson/lesson.component';
import { HomePageComponent } from '../components/home-page/home-page.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'home-Page', component: HomePageComponent },
   {path:'courses',component:CoursesComponent},
   {path:'login',component:LoginComponent},
   {path:'signIn',component:SignInComponent},
   { path: 'courses/:id', component: CourseDetailsComponent },
   {path:'courses/:id/lessons',component:LessonComponent}
];

