import { Component, OnInit } from '@angular/core';
import { LessonService } from '../../app/services/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {

constructor(private lessonService: LessonService,private route:ActivatedRoute) {

}
lessons:any[]=[]
courseId=''
ngOnInit() {
  const courseId = this.route.snapshot.paramMap.get('id')
  if (courseId) {
    this.loadLessons();
    this.courseId=courseId
  }
}
loadLessons(){
  {
    this.lessonService.getLessons(Number(this.courseId)).subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (err) => {
        console.error('Error fetching lessons:', err);
      }
    });
  }
}

getLessonById(){

}

addLesson(){
  
}
}
