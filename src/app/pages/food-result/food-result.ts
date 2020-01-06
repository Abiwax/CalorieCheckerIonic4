import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {GetSetProvider} from '../../providers/get-set/get-set';

/**
 * Generated class for the FoodResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-food-result',
  templateUrl: 'food-result.html',
  styleUrls: ['food-result.scss'],
})
export class FoodResultPage {

  food = '';
  servings: any = [];

  constructor(public navCtrl: NavController, public getset: GetSetProvider) {
    this.initializeFood();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodResultPage');
  }

  initializeFood() {
    const food_serve = this.getset.foodInfo;
    this.food = food_serve.food_name;
    this.servings = food_serve && food_serve.servings && food_serve.servings.serving ? Array.isArray(food_serve.servings.serving) ? food_serve.servings.serving : [food_serve.servings.serving] : [];
  }

  getAllKeys(dict_items) {
    return Object.keys(dict_items);
  }

}
