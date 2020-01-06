import {Component} from '@angular/core';
import { NavController} from '@ionic/angular';

import {ExtrasProvider} from '../../providers/extras/extras';

// declare var JustGage: any;
import * as c3 from 'c3';
import {UtilProvider} from '../../providers/extras/util';
/**
 * Generated class for the BmiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-bmi',
  templateUrl: 'bmi.html',
  styleUrls: ['bmi.scss'],
})
export class BmiPage {
  overlayHidden: boolean = false;
  items: any = [
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {subtitle: '4/16/2013', title: '21:30'}
    },
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {subtitle: 'January', title: '29'}
    },
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {title: 'Short Text'}
    }
  ]

  constructor(public navCtrl: NavController, public extras: ExtrasProvider, public utilProvider: UtilProvider) {

  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.initializeApp();
  }

  initializeApp() {
    c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['bmi', 14.4]
        ],
        type: 'gauge',
        onclick: function (d, i) {
          console.log("onclick", d, i);
        }
      },
      gauge: {
        label: {
          format: function (value, ratio) {
            return value;
          },
          show: true // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 40, // 100 is default
        units: 'kCal',
        width: 39 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#60B044', '#F6C600', '#FF0000'], // the three color levels for the percentage values.
        threshold: {
          values: [18.4, 25, 30, 40]
        }
      },
      size: {
        height: 150
      }
    });

  }

  addBMI() {
    this.utilProvider.addWeight();
  }

  hideOverlay() {
    this.overlayHidden = true;
  }


  onSelect(event) {
    console.log(event)
  }
}
