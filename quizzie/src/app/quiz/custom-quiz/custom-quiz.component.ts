import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/core/quiz.service';

@Component({
  selector: 'app-custom-quiz',
  templateUrl: './custom-quiz.component.html',
  styleUrls: ['./custom-quiz.component.css']
})
export class CustomQuizComponent implements OnInit {
  id = '';
  quiz = [];
  userAnswers = {};
  qNumber = 0;
  randomId = '';
  isSubmitLoading = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.quizService.getCustom(this.id).subscribe({
      next: (d) => {
        for(let item of d){
          for(let key in item){
            this.quiz.push({
              question: key,
              answers: item[key],
            });
          }
        }

        console.log(this.quiz);
      }
    })
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
    this.userAnswers['uId'] = localStorage.getItem('uId');
    this.userAnswers['qId'] = this.id;
    this.quizService.submitCustomQuiz(this.userAnswers).subscribe({
      next: (d) => {
        this.router.navigate(['/home']);
      },
    });
    this.isSubmitLoading = true;
  }

}
