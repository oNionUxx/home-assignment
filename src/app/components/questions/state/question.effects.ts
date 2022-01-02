import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, tap, switchMap, exhaustMap, mergeAll } from 'rxjs/operators';
import { of } from 'rxjs';
import { QuestionsService } from '../../../services/questions.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuestionApiActions, QuestionPageActions } from './actions';

@Injectable()
export class QuestionEffects {
  // Inject Actions from @ngrx/effects
  constructor(private actions$: Actions, private questionsService: QuestionsService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionPageActions.loadQuestions),
      mergeMap(() =>
        this.questionsService.getQuestions().pipe(
          map((questions) => QuestionApiActions.loadQuestionsSuccess({ questions })),
          catchError((error) => of(QuestionApiActions.loadQuestionsFailure({ error })))
        )
      )
    );
  });
}
