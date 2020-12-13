import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/core/quiz.service';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.css'],
})
export class QuizDetailsComponent implements OnInit {
  id = '';
  questions = 0;
  time = 0;
  difficulty = '';
  url = '';
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.quizService.getDetails(this.id).subscribe({
      next: (d) => {
        console.log(d);
        this.questions = d.qNum;
        this.time = d.time;
        this.url = d.imgUrl;

        if(d.difficulty == 1) this.difficulty = 'Easy';
        else if(d.difficulty == 2) this.difficulty = 'Medium';
        else this.difficulty = 'Hard';
      },
    });
  }
}
