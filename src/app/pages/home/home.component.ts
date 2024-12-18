import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from './home.service';
import { BookList } from '../../core/models/book';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  books: BookList[] = [];

  constructor(
    private route: Router,
    private bookService: BooksService,
  ) {}
  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: any) => {
      const transformedBooks = books.map((book: any) => ({
        ...book,
        authors: book.authors
          .map((a: any) => `${a.last_name} ${a.first_name[0]}.`)
          .join(', '),
      }));

      this.books = transformedBooks;
    });
  }

  login(): void {
    this.route.navigate(['login']);
  }
}
