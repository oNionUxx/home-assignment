import { Question } from '../../../models/question';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { QuestionApiActions, QuestionPageActions } from './actions';

// State for this feature (Question)
export interface QuestionState {
  questions: Question[];
  error: string;
}

const initialState: QuestionState = {
  questions: [],
  error: '',
};

export const questionReducer = createReducer<QuestionState>(
  initialState,

  on(QuestionApiActions.loadQuestionsSuccess, (state, action): QuestionState => {
    return {
      ...state,
      questions: action.questions,
      error: '',
    };
  }),
  on(QuestionApiActions.loadQuestionsFailure, (state, _action): QuestionState => {
    return {
      ...state,
      questions: [],
      error: '',
    };
  })
);
