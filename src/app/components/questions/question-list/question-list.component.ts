import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
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
  isCorrect = false;
  startTime = 5;
  userStrikes = 1;
  questionNumber = 0;
  totalUserAnswers = 0;
  timer$: Observable<number>;

  get answer(): AbstractControl {
    return this.form.get('answer');
  }

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl({ value: '', disabled: !this.timer$ }, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.questions && this.questions.length) {
      this.buildArrayOfAnswers();
    }
  }

  onSubmit(q: Question): void {
    const currentQuestion: Question = q;

    if (this.form.valid) {
      const selectedAnswer = this.form.value.answer;
      const { correct_answer } = currentQuestion;

      // user's answer is correct
      if (selectedAnswer === correct_answer) {
        ++this.totalUserAnswers;

        // quiz was ended
        if (this.questionNumber >= this.questions.length) {
          alert('Quiz has been completed!');
          this.quizWasEnded.emit(this.totalUserAnswers);
        } else {
          this.isCorrect = true;
          alert('Correct!, proceed to next question');
          ++this.questionNumber;
        }
        //user's answer is incorrect
      } else {
        // if user got 3 strikes next
        // question will be displayed
        if (this.userStrikes === 3) {
          alert('Sorry, too many tries');
          ++this.questionNumber;
        } else {
          alert('Wrong answer, give it another shot');
          ++this.userStrikes;
        }
      }
    }
  }

  start(): void {
    // user can select an answer
    // only when the countdown starts
    this.answer.enable();

    this.timer$ = timer(0, 1000).pipe(
      map((countdown) => {
        // when the user's time runs out
        // next question will be displayed
        if (this.startTime === countdown) {
          // quiz was ended
          if (this.questionNumber >= this.questions.length) {
            alert('Quiz has been completed!');
            this.quizWasEnded.emit(this.totalUserAnswers);
          } else {
            // user has managed to answer the
            // question before the countdown
            // has finished
            if (!this.isCorrect) {
              alert('Sorry, but you ran out of time');
              ++this.questionNumber;
              this.isCorrect = false;
            }
          }
        }

        return this.startTime - countdown;
      }),
      take(this.startTime + 1)
    );
  }

  // when a new question is shown
  // user strikes is resets
  // timer is resets
  // correct answer resets
  onNewQuestion(): void {
    this.userStrikes = 1;
    this.timer$ = null;
    this.answer.disable();
    this.buildArrayOfAnswers();
  }

  buildArrayOfAnswers(): void {
    this.answers = [this.questions[this.questionNumber]['correct_answer'], ...this.questions[this.questionNumber]['incorrect_answers']];
    this.shuffle();
  }

  shuffle(): void {
    this.answers.map((_answer, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      return ([this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]]);
    });
  }
}
