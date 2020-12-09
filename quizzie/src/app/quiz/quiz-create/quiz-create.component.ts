import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  questions = 0;
  time = 0;
  difficulty = 0;
  type = '';
  questionArray=[];

  continue = false;

  f: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.f = this.fb.group({
      qName: ['']
    })
   }

  addQuestion(): void {
    const data= this.f.value;

    this.f.reset();
  }

  ngOnInit(): void {
  }

}
