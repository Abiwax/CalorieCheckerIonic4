import {Component} from '@angular/core';
import {NavController, PopoverController} from '@ionic/angular';

import {ExtrasProvider} from '../../providers/extras/extras';
import {UtilProvider} from '../../providers/extras/util';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public popoverController: PopoverController, public extras: ExtrasProvider, public utilProvider: UtilProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  async changeHeight() {
    await this.popoverController.dismiss();
    await this.utilProvider.changeHeight(true);
  }
}
