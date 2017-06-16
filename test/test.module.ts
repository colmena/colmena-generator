import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ColmenaUiModule } from '@colmena/admin-ui'

import { TestDetailComponent } from './containers/test-detail.component'
import { TestFormComponent } from './components/test-form.component'
import { TestHeaderComponent } from './components/test-header.component'
import { TestListComponent } from './containers/test-list.component'
import { TestTabsComponent } from './components/test-tabs.component'

import { TestsService } from './tests.service'
import { TestsResolver } from './tests.resolvers'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColmenaUiModule,
    RouterModule,
  ],
  declarations: [
    TestDetailComponent,
    TestFormComponent,
    TestHeaderComponent,
    TestListComponent,
    TestTabsComponent,
  ],
  providers: [
    TestsService,
    TestResolver,
  ],
})
export class TestsModule { }
