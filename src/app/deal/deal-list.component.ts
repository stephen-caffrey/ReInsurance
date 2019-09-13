import { Component, OnInit } from '@angular/core';

import { Deal } from './deal';
import { DealService } from './deal.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "../event/event";

@Component({
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.css']
})
export class DealListComponent implements OnInit {
  pageTitle = 'Deal List';
  errorMessage = '';

  deals: Deal[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dealService: DealService) { }


  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.dealService.getDeals(+param).subscribe({
      next: deals => {
        this.deals = deals;
      },
      error: err => this.errorMessage = err
    });
    console.log("These are my deals: "+ this.deals.toString());
  }

  onBack(): void {
    this.router.navigate(['/events']);
  }
}
