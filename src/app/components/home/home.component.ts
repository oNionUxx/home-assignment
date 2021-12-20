import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  _userScore: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // No need to unsubscribe...
    // The Router destroys a routed component when
    // it is no longer needed and the injected ActivatedRoute dies with it.
    this.route.queryParams.subscribe(({ userScore }) => {
      if (userScore) {
        this._userScore = +userScore;
      }
    });
  }

  navigateToQuiz(): void {
    this._userScore = null;
    this.router.navigate(['questions']);
  }
}
