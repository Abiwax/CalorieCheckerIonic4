import {Injectable} from '@angular/core';
import {Platform, ModalController, NavController, ToastController} from '@ionic/angular';

import {NativeStorage} from '@ionic-native/native-storage/ngx';

/*
 Generated class for the ExtrasProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class ExtrasProvider {

  public bmi: Array<Object>;

  constructor(public platform: Platform, public modalCtrl: ModalController, private nativeStorage: NativeStorage,
              private toastCtrl: ToastController, public navCtrl: NavController) {
    console.log('Hello ExtrasProvider Provider');
  }

  getBMI() {
    if (this.platform.is('cordova')) {
      this.nativeStorage.getItem('BMIDetails')
        .then(
          data => console.log(data),
          error => console.error(error)
        );
    } else {
      const stored_bmi = localStorage.getItem('BMIDetails');
      if (stored_bmi !== '' || stored_bmi) {
        console.log('yes');
      }
    }
  }

  getStorage(name) {
    return this.nativeStorage.getItem(name);
  }

  setStorage(name, value) {
    return this.nativeStorage.setItem(name, value);
  }

  removeStorage(name) {
    return this.nativeStorage.remove(name);
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
}

