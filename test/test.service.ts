import { Injectable } from '@angular/core'
import { Test, TestApi } from '@colmena/admin-lb-sdk'
export { Test } from '@colmena/admin-lb-sdk'
import { UiDataGridService, FormService } from '@colmena/admin-ui'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

@Injectable()
export class TestsService extends UiDataGridService {

  public icon = 'icon-globe'
  public title = 'Tests'
  public selectedTest: Test

  public tableColumns = [
    { field: 'id', label: 'ID', action: 'view' },
    { field: 'name', label: 'Name', action: 'view' },
  ]

  constructor(
    private testApi: TestApi,
    private formService: FormService,
  ) {
    super()
    this.columns = this.tableColumns
  }

  setSelectedTest(test: Test) {
    this.selectedTest = test
  }

  getFormFields() {
    return [
      this.formService.input('id', {
        label: 'ID',
        placeholder: 'ID',
      }),
      this.formService.input('name', {
        label: 'Name',
        placeholder: 'Name',
      }),
      this.formService.email('email', {
        label: 'Email',
        placeholder: 'Email',
      }),
      this.formService.input('description', {
        label: 'Description',
        placeholder: 'Description',
      }),
    ]
  }

  getFormConfig() {
    return {
      icon: this.icon,
      fields: this.getFormFields(),
      showCancel: true,
      hasHeader: false,
    }
  }

  getItems(): Observable<Test[]> {
    return this.testApi.find(this.getFilters())
  }

  getItem(id): Observable<Test> {
    return this.testApi.findById(id)
  }

  getItemCount(): Observable<any> {
    return this.testApi.count(this.getWhereFilters())
  }

  upsertItem(item, successCb, errorCb): Subscription {
    if (item.id) {
      return this.upsertTest(item, successCb, errorCb)
    }
    return this.createTest(item, successCb, errorCb)
  }

  upsertTest(item, successCb, errorCb): Subscription {
    return this.testApi.upsert(item).subscribe(successCb, errorCb)
  }

  createTest(item, successCb, errorCb): Subscription {
    return this.testApi.create(item).subscribe(successCb, errorCb)
  }

  deleteItem(item, successCb, errorCb): Subscription {
    return this.testApi.deleteById(item.id).subscribe(successCb, errorCb)
  }
}
