import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

/*
  Generated class for the ApiCallsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiCallsProvider {
  url = environment.urls.main;

  constructor(public httpClient: HttpClient) {
    console.log('Hello ApiCallsProvider Provider');
  }


  getFoods(search) {
    // let headers = new Headers();
    // headers.append('content-type', 'application/json');
    return this.httpClient.get(this.url + 'foods/?search=' + search);
  }

  getFood(search) {
    // let headers = new Headers();
    // headers.append('content-type', 'application/json');
    return this.httpClient.get(this.url + 'food/?search=' + search);
  }

  getRecipes(search) {
    return this.httpClient.get(this.url + 'recipes/?search=' + search);
  }

  getSingleRecipe(search) {
    return this.httpClient.get(this.url + 'recipe/?search=' + search);
  }

  getLocation() {
    return this.httpClient.get(environment.urls.ip);
  }


}
