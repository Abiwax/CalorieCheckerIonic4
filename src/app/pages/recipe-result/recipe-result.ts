import {Component, ViewChild} from '@angular/core';
import {NavController} from '@ionic/angular';
import {GetSetProvider} from '../../providers/get-set/get-set';

/**
 * Generated class for the RecipeResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-recipe-result',
  templateUrl: 'recipe-result.html',
  styleUrls: ['recipe-result.scss'],
})
export class RecipeResultPage {

  recipe_details: any = {};
  instructions: any = [];
  ingredients: any = [];
  recipe_image: any = [];

  constructor(public navCtrl: NavController, public getSetProvider: GetSetProvider) {
    this.initializeRecipe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipeResultPage');
  }

  setRecipes(recipe_image) {
    const new_list = [];
    if (typeof recipe_image === 'string') {
      new_list.push(recipe_image);
    } else if (typeof recipe_image === 'object') {
      new_list.push.apply(new_list, recipe_image);
    }
    return new_list;
  }

  setRecipeType(recipe_type) {
    const new_list = [];
    if (typeof recipe_type === 'string') {
      new_list.push(recipe_type);
    } else if (typeof recipe_type === 'object') {
      new_list.push.apply(new_list, recipe_type);
    }
    const joined_list = new_list.join();
    return joined_list;
  }

  initializeRecipe() {
    const recipes = this.getSetProvider.preparationInfo;
    this.instructions = recipes.directions.direction;
    this.ingredients = recipes.ingredients.ingredient;
    if ('recipe_images' in recipes && 'recipe_image' in recipes.recipe_images) {
      const recipe_img = recipes.recipe_images.recipe_image;
      this.recipe_image = this.setRecipes(recipe_img);
    } else {
      this.recipe_image = this.setRecipes(0);
    }

    const calories = recipes.serving_sizes.serving.calories;
    const recipe_name = recipes.recipe_name;
    const number_of_servings = recipes.number_of_servings;
    const rating = recipes.rating;
    const recipe_description = recipes.recipe_description;
    const recipe_type = this.setRecipeType(recipes.recipe_types.recipe_type);
    const preparation_time_min = recipes.preparation_time_min;
    const cooking_time_min = recipes.cooking_time_min;
    this.recipe_details = {
      recipe_name: recipe_name,
      recipe_description: recipe_description,
      recipe_type: recipe_type,
      calories: calories,
      number_of_servings: number_of_servings,
      rating: rating,
      preparation_time_min: preparation_time_min,
      cooking_time_min: cooking_time_min
    };
  }

}
