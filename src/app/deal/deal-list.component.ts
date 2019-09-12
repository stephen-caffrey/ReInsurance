import { Component, OnInit } from '@angular/core';

import { Deal } from './deal';
import { DealService } from './deal.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.css']
})
export class DealListComponent implements OnInit {
  pageTitle = 'Deal List';
  showImage = false;
  errorMessage = '';

  _listFilter;
  get listFilter(): number {
    return this._listFilter;
  }
  set listFilter(value: number) {
    this._listFilter = value;
    this.filteredDeals = this.listFilter ? this.performFilter(this.listFilter) : this.deals;
  }

  filteredDeals: Deal[] = [];
  deals: Deal[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dealService: DealService) { }

  performFilter(filterBy: number): Deal[] {
    return this.deals.filter((deal: Deal) =>
      deal.id == filterBy);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.dealService.getDeals(+param).subscribe({
      next: deals => {
        this.deals = deals;
        this.filteredDeals = this.deals;
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/events']);
  }
}
