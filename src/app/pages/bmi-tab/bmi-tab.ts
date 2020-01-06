import {Component} from '@angular/core';
import {NavController, PopoverController, Platform} from '@ionic/angular';

import {PopoverPage} from '../popover/popover';

import {ExtrasProvider} from '../../providers/extras/extras';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {UtilProvider} from "../../providers/extras/util";

/**
 * Generated class for the BmiTabPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-bmi-tab',
  templateUrl: 'bmi-tab.html',
  providers: [ExtrasProvider],
})
export class BmiTabPage {


  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public extras: ExtrasProvider,
              public utilProvider: UtilProvider, public platform: Platform) {
    this.initializeApp();
  }


  async initializeApp() {
    if (this.platform.is('cordova')) {
      this.extras.getStorage('height')
        .then(
          data => console.log(data),
          error => console.error(error)
        );
    } else {
      const stored_height = this.extras.getStorage('height');
      if (!stored_height) {
        await this.utilProvider.changeHeight(false);
      }
    }
  }

  async presentPopover(popevent) {
    const popover = await this.popoverCtrl.create({component: PopoverPage, event: popevent});
    await popover.present();
  }


}
