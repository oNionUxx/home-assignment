import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Question } from '../../../models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionListComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Input() questions: Question[];
  @Input() errorMessage: string;
  @Output() quizWasEnded = new EventEmitter<number>();

  answers: string[];

  startTime = 20;
  isCorrect: boolean;

  userStrikes = 1;
  selectedIndex = -1;

  questionNumber = 0;
  totalUserAnswers = 0;
  timer$: Observable<number>;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl({ value: '', disabled: !this.timer$ }, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.questions && this.questions.length) {
      this.getArrayOfAnswers();
    }
  }

  onSubmit(q: Question): void {
    const currentQuestion: Question = q;

    if (this.form.valid) {
      const selectedAnswer = this.form.value.answer;
      this.selectedIndex = currentQuestion.incorrect_answers.indexOf(selectedAnswer);

      if (selectedAnswer === currentQuestion.correct_answer) {
        this.isCorrect = true;
        ++this.questionNumber;
        ++this.totalUserAnswers;

        if (this.questions.length === this.questionNumber) {
          this.quizWasEnded.emit(this.totalUserAnswers);
        } else {
          alert('Correct!, proceed to next question');
        }
      } else {
        this.isCorrect = false;

        // if user got 3 strikes next
        // question will be displayed
        if (this.userStrikes === 3) {
          alert('Sorry, too many tries');
          ++this.questionNumber;
        } else {
          ++this.userStrikes;
          alert('Wrong answer, give it another shot');
        }
      }
    }
  }

  start(): void {
    // user can select an answer
    // only when the countdown starts
    this.form.get('answer').enable();

    this.timer$ = timer(0, 1000).pipe(
      map((i) => {
        // when the user's time runs out
        // next question will be displayed
        if (i === this.startTime) {
          ++this.questionNumber;

          // quiz was ended
          if (this.questionNumber >= this.questions.length) {
            alert('Quiz has been completed!');
            this.quizWasEnded.emit(this.totalUserAnswers);
          } else {
            alert('Sorry, but you ran out of time');
          }
        }

        return this.startTime - i;
      }),
      take(this.startTime + 1)
    );
  }

  // when a new question is shown
  // user strikes is resets
  // timer is resets
  // correct answer resets
  onNewQuestion(event): void {
    this.userStrikes = 1;
    this.selectedIndex = -1;
    this.timer$ = null;
    this.isCorrect = null;
    this.form.get('answer').disable();
    this.getArrayOfAnswers();
  }

  getArrayOfAnswers(): void {
    this.answers = [
      this.questions[this.questionNumber]['correct_answer'],
      this.questions[this.questionNumber]['incorrect_answers'][0],
      this.questions[this.questionNumber]['incorrect_answers'][1],
      this.questions[this.questionNumber]['incorrect_answers'][2],
    ];
    this.shuffle(this.answers);
  }

  shuffle(arr: string[]): string[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
