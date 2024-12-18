import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '../../../core/services/translate.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

export interface TableColumn {
  label: string;
  attribute: string;
  transform?: (value: any, row?: any) => string;
}

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [TranslatePipe, CommonModule, FormsModule, CapitalizePipe],
  templateUrl: './dynamic-table.component.html',
})
export class DynamicTableComponent implements OnInit {
  @Input() data$: Observable<any[]> = new Observable<any>();
  @Input() columns: TableColumn[] = [];
  @Input() downloadable = false;
  @Output() deleteItemEvent = new EventEmitter<any>();
  @Output() viewItemEvent = new EventEmitter<any>();
  @Output() editItemEvent = new EventEmitter<any>();

  rawData: any[] = [];
  filteredData: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  collectionSize = 0;

  itemToDelete: any;

  searchValue = '';
  sortedColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  showDeleteButton = false;
  showViewButton = false;
  showEditButton = false;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.data$.subscribe((res) => {
      this.rawData = res;
      this.collectionSize = res.length;
      this.search();
    });

    this.showDeleteButton = this.deleteItemEvent.observed;
    this.showViewButton = this.viewItemEvent.observed;
    this.showEditButton = this.editItemEvent.observed;
  }

  paginate(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(
      start,
      start + this.itemsPerPage,
    );
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  sortBy(column: string): void {
    this.sortDirection =
      this.sortedColumn === column && this.sortDirection === 'asc'
        ? 'desc'
        : 'asc';
    this.sortedColumn = column;

    this.filteredData.sort((a, b) => {
      const valA = a[column]?.toString().toLowerCase();
      const valB = b[column]?.toString().toLowerCase();
      return this.sortDirection === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    this.paginate();
  }

  search(): void {
    if (this.searchValue.trim() === '') {
      this.filteredData = this.rawData;
    } else {
      this.filteredData = this.rawData.filter((item) =>
        this.columns.some((col) =>
          item[col.attribute]
            ?.toString()
            .toLowerCase()
            .includes(this.searchValue.toLowerCase()),
        ),
      );
    }
    this.currentPage = 1;
    this.paginate();
  }

  editData(item: any) {
    this.editItemEvent.emit(item);
  }

  viewData(item: any) {
    this.viewItemEvent.emit(item);
  }

  setDeleteItem(item: any) {
    this.itemToDelete = item;
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.itemToDelete);
  }

  transformValue(column: TableColumn, row: any): string {
    const value = row[column.attribute];
    return column.transform ? column.transform(value, row) : value;
  }

  downloadCSV() {
    const header = this.columns
      .map((col) => this.translateService.getTranslate(col.label))
      .join(',');
    const rows = this.rawData.map((row) =>
      this.columns.map((col) => `"${row[col.label] || ''}"`).join(','),
    );

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  }
}
