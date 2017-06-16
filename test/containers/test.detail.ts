import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { TestsService } from '../tests.service'
import { NavTabLink } from '../components/test-tabs.component'

@Component({
  selector: 'app-test-detail',
  template: `
    <div class="card">
      <div class="card-header">
        <app-test-header [item]="item"></app-test-header>
        <app-test-tabs [tabs]="tabs"></app-test-tabs>
      </div>
      <div class="card-block">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .card-header {
      padding-bottom: 0;
    }
  `],
})
export class TestDetailComponent implements OnInit {
  public tabs: NavTabLink[] = [
    { icon: 'fa fa-pencil', title: 'Edit', link: 'edit' },
  ]

  public item: any

  constructor(
    private service: TestsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.item = this.route.snapshot.data.test

    if (!this.item) {
      this.tabs = [
        { icon: 'fa fa-plus', title: 'Create', link: '' },
      ]
    }
    this.service.setSelectedTest(this.item)
  }
}
