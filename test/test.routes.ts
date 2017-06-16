import { Routes } from '@angular/router'

import { TestListComponent } from './containers/test-list.component'
import { TestDetailComponent } from './containers/test-detail.component'
import { TestFormComponent } from './components/test-form.component'

import { TestResolver } from './tests.resolvers'

export const TestsRoutes: Routes = [
  {
    path: 'tests',
    data: { title: 'Tests' },
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: TestListComponent,
        data: { title: 'List' },
      },
      {
        path: 'create',
        component: TestDetailComponent,
        data: { title: 'Create' },
        children: [
          {
            path: '',
            component: TestFormComponent,
          },
        ],
      },
      {
        path: ':id',
        component: TestDetailComponent,
        resolve: {
          test: TestResolver,
        },
        data: { title: 'test' },
        children: [
          {
            path: '',
            redirectTo: 'edit',
            pathMatch: 'full',
          },
          {
            path: 'edit',
            component: TestFormComponent,
            data: { title: 'Edit' },
          },
        ],
      },
    ],
  },
]
