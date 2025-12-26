import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CiscoItemService, CiscoItem } from '../services/cisco-item.service';

@Component({
  selector: 'app-cisco-item-replace',
  templateUrl: './cisco-item-replace.component.html'
})
export class CiscoItemReplaceComponent implements OnInit {

  item!: CiscoItem;

  constructor(
    private route: ActivatedRoute,
    private service: CiscoItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getItem(id).subscribe(res => {
      this.item = res;
    });
  }

  save() {
    this.service.updateItem(this.item.Id!, this.item).subscribe(() => {
      alert('Item replaced successfully');
      this.router.navigate(['/cisco-item']);
    });
  }

  back() {
    this.router.navigate(['/cisco-item']);
  }
}
