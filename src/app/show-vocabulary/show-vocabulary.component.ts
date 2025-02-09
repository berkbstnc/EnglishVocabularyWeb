import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-show-vocabulary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-vocabulary.component.html',
  styleUrls: ['./show-vocabulary.component.css']
})
export class ShowVocabularyComponent implements OnInit {
  vocabulary: any;
  answers: any[] = [];
  correctAnswerId: number = 0;
  message: string = '';
  score: number = 0;

  constructor(private vocabularyService: VocabularyService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadRandomVocabulary();
  }

  loadRandomVocabulary() {
    this.vocabularyService.getRandomVocabulary().subscribe({
      next: data => {
        this.vocabulary = data;
        this.correctAnswerId = this.vocabulary.answersId;
        this.loadAnswers(this.correctAnswerId);
      },
      error: error => {
        console.error('Error fetching random vocabulary:', error);
      }
    });
  }

  loadAnswers(answerId: number) {
    this.vocabularyService.getVocabularyAnswer(answerId).subscribe({
      next: data => {
        this.answers = data;
      },
      error: error => {
        console.error('Error fetching answers:', error);
      }
    });
  }

  checkAnswer(selectedAnswerId: number) {
    if (selectedAnswerId === this.correctAnswerId) {
      this.loadRandomVocabulary();
      this.message = "";
      this.score += 1
    } else {
      debugger;
      this.message = "Try again!";
      this.vocabularyService.addVocabularyGameLog(this.authService.getUserIdromToken(), this.score).subscribe({
        next: response => {
          console.log('API response:', response);
        },
        error: error => {
          console.error('API error:', error);
        }
      });
      this.score = 0;
    }
  }

  navigateTo(option: string) {
    this.router.navigate([option]);
  }
}
