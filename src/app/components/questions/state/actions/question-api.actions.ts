import { Question } from '../../../../models/question';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadQuestionsSuccess = createAction('[Questions API] Load Success', props<{ questions: Question[] }>());

export const loadQuestionsFailure = createAction('[Questions API] Load Fail', props<{ error: string }>());
