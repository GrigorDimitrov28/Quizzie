import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/core/quiz.service';

@Component({
  selector: 'app-random-quiz',
  templateUrl: './random-quiz.component.html',
  styleUrls: ['./random-quiz.component.css'],
})
export class RandomQuizComponent implements OnInit {
  quiz = [];
  userAnswers = {};
  qNumber = 0;
  randomId = '';
  isSubmitLoading = false;

  constructor(private quizService: QuizService, private router:Router) {}

  ngOnInit(): void {
    this.quizService.getRandom().subscribe({
      next: (data) => {
        for (let key in data) {
          if (key !== 'randomId') {
            data[key].map((a) => a.split('&#039;').join("'"));
            this.quiz.push({
              question: key.split('&quot;').join('').replace('&#039;', "'"),
              answers: data[key],
            });
          } else {
            this.randomId = data[key];
          }
        }

        console.log(this.quiz, this.randomId);
      },
    });
  }

  nextQuestion(): void {
    this.qNumber++;
  }

  pushAnswer(aNum, answer) {
    this.userAnswers[this.qNumber] = answer;

    console.log(this.userAnswers);
  }

  goBack(): void {
    this.qNumber > 0 ? this.qNumber-- : (this.qNumber = this.qNumber);
  }

  submit(): void {
    this.userAnswers['qId'] = this.randomId;
    this.userAnswers['uId'] = localStorage.getItem('uId');
    this.quizService.submitRandomQuiz(this.userAnswers).subscribe({
      next: (d) => {
        this.router.navigate(['/home']);
      },
    });
    this.isSubmitLoading = true;
  }
}
