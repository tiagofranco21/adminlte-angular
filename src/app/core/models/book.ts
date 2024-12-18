export interface Author {
  first_name: string;
  last_name: string;
}

export interface Book {
  id?: number;
  title: string;
  abstract: string;
  year: number;
  status: 'active' | 'inactive';
  authors: Author[];
}

export interface BookList {
  id?: number;
  title: string;
  abstract: string;
  year: number;
  status: 'active' | 'inactive';
  authors: string;
}
