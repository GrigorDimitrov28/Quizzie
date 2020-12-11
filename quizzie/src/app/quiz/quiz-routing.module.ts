import { RouterModule, Routes } from '@angular/router';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { RandomQuizComponent } from './random-quiz/random-quiz.component';

const routes: Routes = [
    {
        path: 'details',
        component: QuizDetailsComponent
    },
    {
        path: 'create',
        component: QuizCreateComponent
    },
    {
        path: 'random',
        component: RandomQuizComponent
    }
];

export const QuizRoutingModule = RouterModule.forChild(routes);