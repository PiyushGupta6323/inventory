import { Component, OnInit } from '@angular/core';
import { CiscoItem, CiscoItemService } from 'src/app/services/cisco-item.service';

@Component({
  selector: 'app-cisco-item',
  templateUrl: './cisco-item.component.html',
  styleUrls: ['./cisco-item.component.css']
})
export class CiscoItemComponent implements OnInit {
  items: CiscoItem[] = [];
  selectedItem: CiscoItem | null = null;
  searchText: string = '';

  constructor(private service: CiscoItemService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems() {
    this.service.getItems().subscribe({
      next: data => this.items = data,
      error: err => console.error('getItems error', err)
    });
  }

  filteredItems(): CiscoItem[] {
    if (!this.searchText) return this.items;

    const lower = this.searchText.toLowerCase();
    return this.items.filter(item =>
      Object.values(item || {}).some(val =>
        String(val ?? '').toLowerCase().includes(lower)
      )
    );
  }

  onEdit(item: CiscoItem) {
     console.log('EDIT CLICKED:', item); 
    // Deep clone to avoid editing the array item directly until save
    this.selectedItem = JSON.parse(JSON.stringify(item));
     // Auto-scroll to edit form
  setTimeout(() => {
    document.getElementById('editForm')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, 100);
  }

onDelete(id?: number) {
  if (id == null) {
    console.warn('onDelete called with no id:', id);
    return;
  }

  if (!confirm('Are you sure you want to delete this item?')) return;

  this.service.deleteItem(id).subscribe({
    next: () => {
      console.log('DELETE success for id:', id);
      this.getAllItems();
    },
    error: err => {
      console.error('deleteItem error', err);
      alert('Delete failed — check console/Network tab for details.');
    }
  });
}

  onSubmit() {
    if (!this.selectedItem) return;

    // Safer Id check: not null/undefined and > 0 (adjust if your Id can be 0)
    if (this.selectedItem.Id != null && this.selectedItem.Id > 0) {
      // Update existing item
      this.service.updateItem(this.selectedItem.Id, this.selectedItem).subscribe({
        next: () => {
          this.getAllItems();
          this.selectedItem = null;
        },
        error: err => console.error('updateItem error', err)
      });
    } else {
      // Create new item
      this.service.createItem(this.selectedItem).subscribe({
        next: () => {
          this.getAllItems();
          this.selectedItem = null;
        },
        error: err => console.error('createItem error', err)
      });
    }
  }

  onCancel() {
    this.selectedItem = null;
  }
}
