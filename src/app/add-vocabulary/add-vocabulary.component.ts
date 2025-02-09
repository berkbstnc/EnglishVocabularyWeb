import { Component } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vocabulary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-vocabulary.component.html',
  styleUrls: ['./add-vocabulary.component.css']
})
export class AddVocabularyComponent {
  addVocabularyForm: FormGroup;
  status: string = '';
  statusFlag: boolean = false;
  statusType: string = 'success';
  submitted = false;

  constructor(private vocabularyService: VocabularyService, private router: Router, private formBuilder: FormBuilder) { 
    this.addVocabularyForm = this.formBuilder.group({
      vocabulary: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  addVocabulary() {
    this.submitted = true;

    if (this.addVocabularyForm.invalid) {
      return;
    }

    const vocabularyMatch = {
      vocabulary: this.addVocabularyForm.value.vocabulary,
      answer: this.addVocabularyForm.value.answer
    };

    this.vocabularyService.addVocabulary(vocabularyMatch).subscribe({
      next: response => {
        console.log(response);
        this.status = "Success!";
        this.statusType = 'success';
      },
      error: error => {
        this.status = "Failed!";
        this.statusType = 'error';
      }
    });

    this.statusFlag = true;
  }

  navigateTo(option: string) {
    this.router.navigate([option]);
  }
}
