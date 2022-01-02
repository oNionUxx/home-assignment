import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Question } from '../../../models/question';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getQuestions, getError } from '../state';
import { QuestionPageActions } from '../state/actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-shell',
  templateUrl: './question-shell.component.html',
  styleUrls: ['./question-shell.component.scss'],
})
export class QuestionShellComponent implements OnInit {
  questions$: Observable<Question[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.questions$ = this.store.select(getQuestions);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(QuestionPageActions.loadQuestions());
  }

  getUserAnswers(totalUserAnswers: number): void {
    this.router.navigate(['/'], { queryParams: { userScore: totalUserAnswers } });
  }
}
