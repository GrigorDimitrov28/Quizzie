import { RouterModule, Routes } from '@angular/router';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';

const routes: Routes = [
    {
        path: 'details',
        component: QuizDetailsComponent
    },
    {
        path: 'create',
        component: QuizCreateComponent
    }
];

export const QuizRoutingModule = RouterModule.forChild(routes);