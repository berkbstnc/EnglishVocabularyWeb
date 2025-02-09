import { Component } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent {
  scoreboard: any[] = [];
  pagedScoreboard: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  loading: boolean = false;

  constructor(private vocabularyService: VocabularyService, private router: Router) {}

  ngOnInit() {
    this.loadScoreboard();
  }

  loadScoreboard() {
    this.loading = true;
    this.vocabularyService.getScoreboard().subscribe({
      next: data => {
        this.scoreboard = data;
        this.updatePagedData();
        this.loading = false;
      },
      error: error => {
        console.error('There was an error!', error);
        this.loading = false;
      }
    });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedScoreboard = this.scoreboard.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }

  get totalPages(): number[] {
    const total = Math.ceil(this.scoreboard.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  navigateTo(option: string) {
    this.router.navigate([option]);
  }
}
