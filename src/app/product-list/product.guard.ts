import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductListService } from './product-list.service';

@Injectable({
  providedIn: 'root',
})
export class ProductGuard implements CanActivate {
  isEmpty: any;
  constructor() {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    this.isEmpty = localStorage.length
    return this.isEmpty !==0 ? false :true;
  }
}
