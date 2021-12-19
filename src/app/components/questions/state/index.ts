import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../../state/app.state';
import { QuestionState } from './question.reducer';

// Extends the app state to include the question feature.
// This is required because questions are lazy loaded.
// So the reference to QuestionState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  questions: QuestionState;
}

// Selector functions
const getQuestionFeatureState = createFeatureSelector<QuestionState>('questions');

export const getQuestions = createSelector(getQuestionFeatureState, (state) => state.questions);

export const getError = createSelector(getQuestionFeatureState, (state) => state.error);
