import {Component} from '@angular/core';
import {NavController, NavParams, Platform, AlertController, ModalController} from '@ionic/angular';

import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {ExtrasProvider} from "../../providers/extras/extras";

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
  styleUrls: ['modal.scss'],
})
export class ModalPage {
  modal_num: number = null;
  modal_name = '';
  height: any = {};
  weight: any = {};
  show_me = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController, public platform: Platform,
              public alertCtrl: AlertController, private extrasProvider: ExtrasProvider) {
    this.modal_num = navParams.get('modal_num');
    this.modal_name = navParams.get('modal_name');
    this.show_me = navParams.get('show_me');
    console.log(this.show_me)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');

  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async closeModals() {
    this.presentConfirm();
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Close Confirmation',
      message: 'Are you sure you want to close this modal, you will be redirected back to the previous page?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Redirect',
          handler: () => {
            // console.log('Buy clicked');
            this.modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }


  async saveHeight() {
    const height = this.height;
    const height_value = height.value;
    if (this.platform.is('cordova')) {
      await this.extrasProvider.setStorage('height', {height: height})
    } else {
      await this.extrasProvider.setStorage('height', height_value);
    }
    this.closeModal();


  }

  async saveBMI() {
    const height = await this.extrasProvider.getStorage('height');
    const weight = this.weight;
    const weight_value = weight.value;
    const d = new Date();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const day = d.getDate();
    const date = year + '-' + month + '-' + day;
    let outputBMI;
    const heightm = parseInt(height) / 100;
    const outputheight = Math.pow(heightm, 2);
    outputBMI = weight_value / outputheight;
    outputBMI = outputBMI.toFixed(2);
    const status = this.getBMIStatus(outputBMI);
    await this.insertBMI(height, weight_value, outputBMI, date, status);
  }

  getBMIStatus(outputBMI) {

    let status = '';
    if (outputBMI > 18.5 && outputBMI < 24.9) {
      status = 'Normal';
    } else if (outputBMI > 25 && outputBMI < 30) {
      status = 'Overweight';
    } else if (outputBMI > 30 && outputBMI < 40) {
      status = 'Obese';
    } else if (outputBMI >= 40) {
      status = 'Morbidly Obese';
    } else {
      status = 'Underweight';
    }
    return status;
  }


  async insertBMI(height, weight, bmi, date, status) {
    if (this.platform.is('cordova')) {
      await this.extrasProvider.setStorage('BMIDetails', {
        height: height,
        weight: weight,
        bmi: bmi,
        date: date,
        status: status
      });
    }

  }


}
