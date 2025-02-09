import { Component, OnInit } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-vocabulary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-vocabulary.component.html',
  styleUrls: ['./list-vocabulary.component.css']
})
export class ListVocabularyComponent implements OnInit {
  vocabularyList: any[] = [];
  pagedVocabularyList: any[] = [];
  loading: boolean = true;
  showPopup: boolean = false;
  searchBox: string = '';
  currentId: number = 0;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number[] = [];

  constructor(private vocabularyService: VocabularyService, private router: Router) {}

  ngOnInit() {
    this.loadVocabularyList();
  }

  loadVocabularyList() {
    this.vocabularyService.getVocabularyList().subscribe({
      next: data => {
        this.vocabularyList = data;
        this.initializePagination();
        this.loading = false;
      },
      error: error => {
        console.error('There was an error!', error);
        this.loading = false;
      }
    });
  }

  deleteVocabulary() {
    debugger;
    this.vocabularyService.deleteVocabulary(this.currentId).subscribe({
      next: response => {
        console.log('Delete successful:', response);
      },
      error: error => {
        console.error('Delete failed:', error);
      },
      complete: () => {
        console.log('Delete request completed.');
        window.location.reload();
      }
    });
  }

  initializePagination() {
    const totalItems = this.vocabularyList.length;
    this.totalPages = Array.from({ length: Math.ceil(totalItems / this.itemsPerPage) }, (_, i) => i + 1);
    this.updatePagedVocabularyList();
  }

  updatePagedVocabularyList() {

  const searchTerm = this.searchBox.toLowerCase().trim();

  const filteredList = this.vocabularyList.filter(vocab =>
    vocab.word.toLowerCase().includes(searchTerm) || 
    vocab.answer.toLowerCase().includes(searchTerm)
  );

  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;

  this.pagedVocabularyList = filteredList.slice(start, end);

  this.totalPages = Array.from({ length: Math.ceil(filteredList.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedVocabularyList();
  }

  navigateTo(option: string, id: number) {
  this.vocabularyService.setEditId(id);
  this.router.navigate([option]);
  }

  navigatePage(option: string) {
    this.router.navigate([option]);
  }

  openPopup(currentId: number){
    this.currentId = currentId;
    this.showPopup = true;
  }

  closePopup(){
    this.showPopup = false;
  }

  onSearchChange(){
  this.currentPage = 1;
  this.updatePagedVocabularyList();
  }
}