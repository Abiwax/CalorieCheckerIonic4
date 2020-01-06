import {Injectable} from '@angular/core';
import {Platform, ModalController, NavController} from '@ionic/angular';

import {ModalPage} from '../../components/modal/modal';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

/*
 Generated class for the ExtrasProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class UtilProvider {

  public bmi: Array<Object>;

  constructor(public platform: Platform, public modalCtrl: ModalController, private nativeStorage: NativeStorage,
              public navCtrl: NavController) {
    console.log('Hello ExtrasProvider Provider');
  }

  async changeHeight(show_me) {
    const modalPage = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {modal_name: 'Add Height', modal_num: 1, show_me: show_me}
    });
    modalPage.onDidDismiss().then(data => {
      console.log(data);
      this.checkHeight();
    });
    await modalPage.present();
  }

  async addWeight() {
    const modalPage = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {modal_name: 'Add Weight', modal_num: 2}
    });
    await modalPage.present();
  }


  async checkHeight() {
    if (this.platform.is('cordova')) {
      this.nativeStorage.getItem('height')
        .then(
          data => console.log(data),
          error => console.error(error)
        );
    } else {
      const stored_height = localStorage.getItem('height');
      if (stored_height === '' || stored_height === null || stored_height === undefined) {
        await this.navCtrl.navigateRoot('/home');

      }
    }
  }
}

