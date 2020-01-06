import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

/*
  Generated class for the GetSetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetSetProvider {


  private _search: any;
  private _foodInfo: any;
  private _recipeInfo: any;
  private _preparationInfo: any;

  constructor(private router: Router) {
  }

  get search(): any {
    return this._search;
  }

  set search(value: any) {
    this._search = value;
  }

  get foodInfo(): any {
    return this._foodInfo;
  }

  set foodInfo(value: any) {
    this._foodInfo = value;
  }

  get preparationInfo(): any {
    return this._preparationInfo;
  }

  set preparationInfo(value: any) {
    this._preparationInfo = value;
  }

  get recipeInfo(): any {
    return this._recipeInfo;
  }

  set recipeInfo(value: any) {
    this._recipeInfo = value;
  }

}
