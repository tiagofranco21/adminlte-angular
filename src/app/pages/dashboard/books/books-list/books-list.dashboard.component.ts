import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BooksService } from '../books.dashboard.service';
import { BookList } from '../../../../core/models/book';
import {
  DynamicTableComponent,
  TableColumn,
} from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/dashboard/breadcrumb/breadcrumb.component';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-books-list-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DynamicTableComponent,
    BreadcrumbComponent,
    TranslatePipe,
  ],
  templateUrl: './books-list.dashboard.component.html',
})
export class BooksListDashboardComponent implements OnInit {
  books$: BehaviorSubject<BookList[]> = new BehaviorSubject<BookList[]>([]);
  columns: TableColumn[] = [
    { label: 'Title', attribute: 'title' },
    { label: 'Year', attribute: 'year' },
    {
      label: 'Authors',
      attribute: 'authors',
    },
    {
      label: 'Status',
      attribute: 'status',
      transform: (value) => (value === 'active' ? 'Active' : 'Inactive'),
    },
  ];

  constructor(
    private booksService: BooksService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.booksService.getBooks().subscribe((books) => {
      const transformedBooks = books.map((book) => ({
        ...book,
        authors: book.authors
          .map((a: any) => `${a.last_name} ${a.first_name[0]}.`)
          .join(', '),
      }));

      this.books$.next(transformedBooks);
    });
  }

  onEditBook(book: BookList): void {
    this.router.navigate([`/dashboard/books/edit/${book.id}`]);
  }

  onDeleteBook(book: BookList): void {
    this.booksService.deleteBook(book.id!).subscribe(() => {
      this.loadBooks();
    });
  }

  goToBooks(): void {
    this.router.navigate(['/dashboard/books/add']);
  }
}
