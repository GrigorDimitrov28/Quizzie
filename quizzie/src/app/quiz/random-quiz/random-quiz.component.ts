import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/core/quiz.service';

@Component({
  selector: 'app-random-quiz',
  templateUrl: './random-quiz.component.html',
  styleUrls: ['./random-quiz.component.css']
})
export class RandomQuizComponent implements OnInit {
  quiz = [];
  userAnswers = [];
  qNumber = 0;

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizService.getRandom().subscribe({
      next: (data) => {
        for(let key in data ){
          data[key].map(a => a.split('&#039;').join(''))
          this.quiz.push({question: key.split('&quot;').join('').replace('&#039;', "'"), answers: data[key]});
        }

        console.log(this.quiz);
      }
    })
  }

  nextQuestion(): void {
    this.qNumber++;
  }

  pushAnswer(aNum) {
    for(let item of this.userAnswers) {
      if(item.qn == this.qNumber){
        this.userAnswers[item.qn].a = this.quiz[this.qNumber].answers[aNum];
        console.log(this.userAnswers);
        return;
      } 
    }

    this.userAnswers.push( {
      qn: this.qNumber,
      a: this.quiz[this.qNumber].answers[aNum]
    })

    console.log(this.userAnswers);
  }

  goBack(): void {
    this.qNumber > 0 ? this.qNumber-- : this.qNumber = this.qNumber;
  }

}
