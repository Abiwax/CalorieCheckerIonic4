import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, LoadingController} from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';

import {ApiCallsProvider} from '../../providers/api-calls/api-calls';
import {RecipeResultPage} from '../recipe-result/recipe-result';
import {ActivatedRoute} from '@angular/router';
import {GetSetProvider} from "../../providers/get-set/get-set";

/**
 * Generated class for the RecipePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
  styleUrls: ['recipe.scss']
})
export class RecipePage {

  recipes: any = [];
  loading: any;

  constructor(public navCtrl: NavController, private _sanitizer: DomSanitizer,
              public apiCalls: ApiCallsProvider, public loadingCtrl: LoadingController,
              private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private getSetProvider: GetSetProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ionViewDidEnter() {
    this.initializeRecipes();
  }

  displayLoading(text) {
    this.presentToast(text);
  }

  async searchRecipes(foodtext) {
    this.apiCalls.getRecipes(foodtext).subscribe(async (data) => {

      if (data['results'] && data['results']['error']) {
        this.displayLoading('An error occurred, please try again later.');
      } else {
        this.recipes = data['results'];
      }
    }, error => {
      this.displayLoading('Failed to retrieve data, try again later.');
    });
  }

  async initializeRecipes() {
    const foodtext = this.getSetProvider.search;
    await this.searchRecipes(foodtext);
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'bottom'
    });

    await toast.onDidDismiss().then(() => {
      console.log('Dismissed toast');
    });

    await toast.present();
  }

  async getMoreDetails(recipe) {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    const recipe_id = recipe.recipe_id;
    this.apiCalls.getSingleRecipe(recipe_id).subscribe(recipedata => {
      if (recipedata && recipedata['results'] && recipedata['results']['error']) {
        this.loading.dismiss().then(() => {
          this.presentToast('An error occurred, please try again later.');
        });
      } else {
        this.loading.dismiss().then(() => {
          this.getSetProvider.preparationInfo = recipedata['results'];
          this.navCtrl.navigateRoot('/recipe-result');
        });
      }

    }, error => {
      this.loading.dismiss().then(() => {
        this.presentToast('Failed to retrieve data, try again later.');
      });
    });
  }

  getBackground(image) {
    const real_image = image === undefined ? `url("assets/images/black.png")` : `url("assets/images/black.png"), url("${image}")`;
    return this._sanitizer.bypassSecurityTrustStyle(real_image);
  }

  async getRecipes(searchbar) {
    // Reset items back to all of the items
    this.initializeRecipes();

    // set q to the value of the searchbar
    const query = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!query) {
      return;
    }
    if (this.recipes && this.recipes.length > 0) {
      this.recipes = this.recipes.filter((value) => {
        if (value.recipe_name && query) {
          const lower_case = value.recipe_name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          return lower_case;
        }
      });
    } else {
      await this.searchRecipes(query);
    }
  }

}
