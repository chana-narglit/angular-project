import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from '../../app/services/courses.service';
import { LessonService } from '../../app/services/lesson.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,RouterModule , MatCardModule, MatButtonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  course: any;

  constructor(private route: ActivatedRoute, private coursesService: CoursesService) {}
courseId=""
  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id')
    if (courseId) {
      this.loadCourse(courseId);
      this.courseId=courseId
    }
    

  }

  loadCourse(id: string) {
    this.coursesService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
      },
      error: (err) => {
        console.error('Error fetching course:', err);
      }
    });
  }

  getAllLessons()
{
  
}
}

