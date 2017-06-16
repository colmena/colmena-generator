import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Test, TestsService } from './tests.service'

@Injectable()
export class TestsResolver implements Resolve<Test> {

  constructor(private service: TestsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Test> {
    return this.service.getItem(route.params.id)
  }
}
