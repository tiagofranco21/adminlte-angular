import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../books.dashboard.service';
import { Book } from '../../../../core/models/book';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/dashboard/breadcrumb/breadcrumb.component';
import { ToastService } from '../../../../core/services/toast.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-books-add-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BreadcrumbComponent,
    TranslatePipe,
  ],
  templateUrl: './books-add.dashboard.component.html',
})
export class BooksAddDashboardComponent implements OnInit {
  bookForm: FormGroup;
  isEdit = false;
  bookId: number | null = null;
  currentYear: number = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      abstract: ['', Validators.required],
      year: [
        null,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(this.currentYear),
        ],
      ],
      status: ['active', Validators.required],
      authors: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'] ? params['id'] : null;
      this.isEdit = !!this.bookId;

      if (this.isEdit) {
        this.loadBook();
      } else {
        this.addAuthor();
      }
    });
  }

  loadBook(): void {
    if (this.bookId) {
      this.booksService.getBookById(this.bookId).subscribe((book) => {
        this.bookForm.patchValue({
          title: book.title,
          abstract: book.abstract,
          year: book.year,
          status: book.status,
        });

        book.authors.forEach((author) =>
          this.addAuthor(author.first_name, author.last_name),
        );
      });
    }
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor(firstName = '', lastName = ''): void {
    this.authors.push(
      this.fb.group({
        first_name: [firstName, Validators.required],
        last_name: [lastName],
      }),
    );
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    const book: Book = { ...this.bookForm.value };

    if (this.isEdit && this.bookId) {
      this.booksService.updateBook(this.bookId, book).subscribe({
        next: () => {
          this.toastService.show(
            'Success',
            'Book updated successfully!',
            'success',
            2,
          );
          this.router.navigate(['/dashboard/books']);
        },
        error: (err) => {
          const errorMessage =
            err?.error?.message || 'Book update failed. Please try again.';
          this.toastService.show('Error', errorMessage, 'danger');
        },
      });
    } else {
      this.booksService.createBook(book).subscribe({
        next: () => {
          this.toastService.show(
            'Success',
            'Book registered successfully!',
            'success',
            2,
          );
          this.router.navigate(['/dashboard/books']);
        },
        error: (err) => {
          const errorMessage =
            err?.error?.message ||
            'Book registration failed. Please try again.';
          this.toastService.show('Error', errorMessage, 'danger');
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/books']);
  }
}
