import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UiService } from '@colmena/admin-ui'

import { Test, TestsService } from '../test.service'

@Component({
  selector: 'app-test-form',
  template: `
    <ui-form *ngIf="item" [config]="formConfig" [item]="item" (action)="handleAction($event)"></ui-form>
  `,
})
export class TestFormComponent implements OnInit {

  public formConfig: any = {}
  public item: any

  constructor(
    private service: TestsService,
    private uiService: UiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.item = this.service.selectedTest || new Test()
    this.formConfig = this.service.getFormConfig()
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        return this.service.upsertItem(
          event.item,
          () => {
            this.uiService.toastSuccess('Save Test Success', `<u>${event.item.name}</u> has been saved successfully`)
          },
          err => this.uiService.toastError('Save Test Fail', err.message)
        ).add(() => this.router.navigate(['/system/test']))
      case 'cancel':
        return this.router.navigate(['/system/test'])
      default:
        return console.log('Unknown event action:', event)
    }
  }

}
