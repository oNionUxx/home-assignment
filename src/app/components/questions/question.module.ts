import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { QuestionShellComponent } from './question-shell/question-shell.component';
import { QuestionListComponent } from './question-list/question-list.component';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { questionReducer } from './state/question.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuestionEffects } from './state/question.effects';

const questionRoutes: Routes = [{ path: '', component: QuestionShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(questionRoutes),
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  declarations: [QuestionShellComponent, QuestionListComponent],
})
export class QuestionModule {}
