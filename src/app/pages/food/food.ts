import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, LoadingController} from '@ionic/angular';

import {ApiCallsProvider} from '../../providers/api-calls/api-calls';
import {ActivatedRoute} from '@angular/router';
import {GetSetProvider} from '../../providers/get-set/get-set';

/**
 * Generated class for the FoodPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-food',
  templateUrl: 'food.html',
  styleUrls: ['food.scss']
})
export class FoodPage {

  foods: any = [];
  loading: any;

  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute, public loadingCtrl: LoadingController,
              public apiCalls: ApiCallsProvider, public getset: GetSetProvider, private toastCtrl: ToastController) {
    this.initializeFoods();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodPage');

  }

  ionViewDidEnter() {
    this.initializeFoods();
  }

  async displayLoading(text) {
    this.presentToast(text);
  }

  async searchFoods(foodtext) {
    this.apiCalls.getFoods(foodtext).subscribe(async (data) => {
      if (data['results'] && data['results']['error']) {
        this.displayLoading('An error occurred, please try again later.');
      } else {
        this.foods = data['results'];
      }
    }, error => {
      this.displayLoading('Failed to retrieve data, try again later.');
    });

  }

  async initializeFoods() {
    const foodtext = this.getset.search;
    await this.searchFoods(foodtext);
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'bottom'
    });

    toast.onDidDismiss().then(() => {
      console.log('Dismissed toast');
    });

    await toast.present();
  }

  async getMoreDetails(food) {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    const food_id = food.food_id;
    this.apiCalls.getFood(food_id).subscribe((fooddata) => {
      if (fooddata['results'] && fooddata['results']['error']) {
        this.loading.dismiss().then(() => {
          this.presentToast('An error occurred, please try again later.');
        });
      } else {
        this.loading.dismiss().then(() => {
          this.getset.foodInfo = fooddata['results'];
          this.navCtrl.navigateForward('/food-result');
        });
      }
    }, error => {
      this.loading.dismiss().then(() => {
        this.presentToast('Failed to retrieve data, try again later.');
      });
    });
  }

  async getFoods(searchbar) {
    // Reset items back to all of the items
    this.initializeFoods();

    // set q to the value of the searchbar
    const query = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!query) {
      return;
    }

    if (this.foods && this.foods.length > 0) {
      this.foods = this.foods.filter((value) => {
        if (value.food_name && query) {
          const lower_case = value.food_name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          return lower_case;
        }
      });
    } else {
      await this.searchFoods(query);
    }
  }

}
