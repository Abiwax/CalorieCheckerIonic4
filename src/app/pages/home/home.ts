import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

import {FormBuilder, Validators} from '@angular/forms';
import {GetSetProvider} from "../../providers/get-set/get-set";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomePage {
  public searchForm;
  error_detail: string = '';
  error_show = false;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public getSetProvider: GetSetProvider) {
    this.searchForm = formBuilder.group({
      foodtext: ['', Validators.compose([Validators.required])]
    });
  }

  setError(text) {
    this.error_show = true;
    this.error_detail = text;
  }

  searchFood() {
    if (!this.searchForm.valid) {
      this.setError('Fill in the required field.');
    } else {
      this.getSetProvider.search = this.searchForm.value.foodtext;


      this.navCtrl.navigateForward(`/food`);
    }
  }

}
