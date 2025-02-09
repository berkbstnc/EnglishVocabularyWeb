import { Component } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id: number = 0;
  vocabulary: string = '';
  answer: string = '';
  constructor(private vocabularyService: VocabularyService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {

    const id = this.vocabularyService.getEditId();
    if (id == null) {
      this.navigateTo('list');
    }
    else {
      this.id = id;
    }

    this.getSelectedVocabulary(this.id);

  }

  navigateTo(option: string) {
    this.router.navigate([option]);
  }

  updateVocabulary() {

    this.vocabularyService.updateVocabulary(this.id, this.vocabulary, this.answer).subscribe({
      next: response => {
        console.log(response);
        window.location.reload();
      },
      error: error => {
        console.error(error);
      },
      complete: () => {
        console.log('Vocabulary update completed');
      }
    });
  }

  getSelectedVocabulary(id : number) {
    this.vocabularyService.getSelectedVocabulary(id).subscribe({
      next: data => {
        this.vocabulary = data.word;
        this.answer = data.answer;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

}
