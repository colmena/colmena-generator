import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-test-tabs',
  template: `
    <ul class="nav nav-tabs card-header-tabs">
      <li *ngFor="let item of tabs" class="nav-item">
        <a [routerLink]="item.link" routerLinkActive="active" class="nav-link">
          <i [class]="item.icon"></i> &nbsp; 
        </a>
      </li>
    </ul>
  `,
  styles: [`
    .card-header-tabs {
      padding-top: 10px;
    }
    .nav-link {
      min-width: 100px;
      text-align: center;
      border-top: 1px solid #eceff1;
    }
    .nav-link.active,
    .nav-link:focus,
    .nav-link:hover {
      border-top: 1px solid #cfd8dc !important;
      border-bottom: 0;
    }
  `],
})
export class TestTabsComponent {

  @Input() tabs: NavTabLink[]

}

export interface NavTabLink {
  icon: string
  title: string
  link: string
}
