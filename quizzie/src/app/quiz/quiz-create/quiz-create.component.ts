import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from 'src/app/core/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  qNum = 0;
  time = 0;
  difficulty = 0;
  type = '';
  qArray=[];
  creator = localStorage.getItem('uId');
  canPost = false;

  continue = false;

  f: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {
    this.f = this.fb.group({
      qName: [''],
      qRAnswer: [''],
      qWAnswer1: [''],
      qWAnswer2: [''],
      qWAnswer3: ['']
    })
   }

  addQuestion(): void {
    const data= this.f.value;
    this.qArray.push(data);
    if(this.qArray.length == this.qNum) {
      this.canPost = true;
    }else {
      this.f.reset();
      console.log(this.qArray);
    }
  }

  createQuiz(): void {
    const data = {
      qNum: this.qNum,
      time: this.time,
      difficulty: this.difficulty,
      type: this.type,
      qArray: this.qArray,
      creator: this.creator
    }

    this.quizService.create(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
  }

}
