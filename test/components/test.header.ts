import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-test-header',
  template: `
    <h5 class="my-2">
      <span *ngIf="item; else message">
         <small></small>
      </span>
      <ng-template #message>Add New Test</ng-template>
    </h5>
  `,
})
export class TestHeaderComponent {

  @Input() item

}
