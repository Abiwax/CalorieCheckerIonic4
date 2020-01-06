import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

/**
 * Generated class for the FoodRecipeResultPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-food-recipe-result',
  templateUrl: 'food-recipe-result.html'
})
export class FoodRecipeResultPage {
  search: string = '';

  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(params => {
      this.search = params.search;
    });
  }

}
