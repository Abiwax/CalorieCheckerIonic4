import {Component} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {GetSetProvider} from "../../providers/get-set/get-set";
import {ActivatedRoute} from "@angular/router";

/**
 * Generated class for the ReciperesultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-reciperesult',
  templateUrl: 'reciperesult.html',
})
export class ReciperesultPage {
  food: any = {};

  constructor(public navCtrl: NavController, public getSetProvider: GetSetProvider, private activatedRoute: ActivatedRoute) {
    this.initializeFood();
  }


  initializeFood() {
    const food = this.getSetProvider.foodInfo;
    this.activatedRoute.queryParams.subscribe(params => {
      const search_food = params.foodsearch;
      const food_description = food.food_description;
      const serving = food_description.split('-')[0];
      const calories = food_description.split('-')[1].split('|')[0].split(':')[1];
      this.food = {title: search_food, serving: serving, calories: calories}
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReciperesultPage');
  }

}

