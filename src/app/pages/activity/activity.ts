import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import {NavController, Platform, ToastController, LoadingController} from '@ionic/angular';

import {ApiCallsProvider} from '../../providers/api-calls/api-calls';


import {Geolocation} from '@ionic-native/geolocation/ngx';

// import {IonPullUpFooterState} from 'ionic-pullup';


import * as mapboxgl from 'mapbox-gl';
import {Chart} from 'chart.js';
import {interval} from 'rxjs';
import {ExtrasProvider} from '../../providers/extras/extras';

import {environment} from '../../../environments/environment';

declare var turf: any;

// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   LatLng,
//   CameraPosition,
//   MarkerOptions,
//   Marker
// } from '@ionic-native/google-maps';


/**
 * Generated class for the ActivityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// declare var google;
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})

export class ActivityPage implements AfterViewInit {

  @ViewChild('map', {read: ElementRef, static: false}) mapElement: ElementRef;
  @ViewChild('stopwatch', {read: ElementRef, static: false}) stopWatch: ElementRef;
  @ViewChild('lineCanvas', {static: false}) lineCanvas;

  map: any;
  mapInitialised = false;
  apiKey: any;
  Coordinates: any;
  origin: any;
  watch: any;
  // footerState: IonPullUpFooterState;
  running = false;
  stoprunning = true;
  disable = true;
  display: any;
  times: any;
  time: any;
  laps: any;
  lineChart: any;
  exercise: any;
  type = 'walk';
  subscription: any;
  timer: any;
  loading: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public platform: Platform,
              public apiCalls: ApiCallsProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private extrasProvider: ExtrasProvider) {
    this.apiKey = environment.keys.google;
    // this.footerState = IonPullUpFooterState.Collapsed;
    this.running = false;
    this.laps = [];

    this.setup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
    this.setupChart();
  }

  async setup() {
    this.loading = await this.loadingCtrl.create();
  }

  // Load map only after view is initialized
  ngAfterViewInit() {
    setTimeout(() => {
      this.display = this.stopWatch.nativeElement;
      this.getTime();
      this.print();
      this.loading.present();
    }, 5000);
  }

  ionViewDidEnter() {
    this.getCoordinate().then((coordinate) => {
      if (coordinate['success'] === 'true') {
        this.Coordinates = coordinate['result'];
        this.executemap();
      } else {
        this.extrasProvider.presentToast('Failed to retrieve current location.');
      }
    });
  }

  ionViewWillLeave() {
    console.log('Looks like I\'m about to leave :');
    console.log(this.times);
    this.removeInterval();
    this.saveTime();
  }

  async saveTime() {
    console.log(this.running);
    if (this.running) {
      await this.extrasProvider.setStorage('running', 'true');
      await this.extrasProvider.setStorage('lastdate', new Date().toString());
      await this.extrasProvider.setStorage('lasttimes', JSON.stringify(this.times));
    } else {
      await this.extrasProvider.removeStorage('running');
      await this.extrasProvider.removeStorage('lastdate');
      await this.extrasProvider.removeStorage('lasttimes');
    }
  }

  async getTime() {

    const running = await this.extrasProvider.getStorage('running');
    if (running === 'true') {
      const date_past = new Date(await this.extrasProvider.getStorage('lastdate')).getTime();
      const date_now = new Date().getTime();

      const difference = (date_now - date_past) / 1000;
      const minute = Math.round(difference / 60);
      const lasttimes = JSON.parse(await this.extrasProvider.getStorage('lasttimes'));
      lasttimes[0] = lasttimes[0] + minute;
      this.times = lasttimes;
      this.start();
    } else {
      this.reset();
    }


  }

  async removeInterval() {
    const interval = await this.extrasProvider.getStorage('mapinterval');
    if (interval) {
      window.clearInterval(parseInt(interval));
    }

  }

  setupChart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            fill: false,
            cubicInterpolationMode: 'monotone',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#A03838',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#A03838',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#A03838',
            pointHoverBorderColor: '#A03838',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 56],
            spanGaps: false,
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        }
      }

    });
  }

  async executemap() {

    mapboxgl.accessToken = environment.keys.mapbox;
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/traffic-night-v2',
      center: [this.Coordinates.longitude, this.Coordinates.latitude],
      zoom: 17,
      pitch: 80,
      minZoom: 6, // restrict map zoom - buildings not visible beyond 13
      maxZoom: 25,
      container: 'map'
    });

    // A single point that animates along the route.
    // Coordinates are initially set to origin.
    const point_details = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [this.Coordinates.longitude, this.Coordinates.latitude]
        },
        'properties': {
          'marker-color': '#ff8888',
          'title': 'Mapbox',
          'description': 'Washington, D.C.',
          'marker-symbol': 'default_marker'
        }
      }]
    };


    map.on('load', async () => {


      // function addLayer() {
      //   map.addLayer({
      //     'id': 'route',
      //     'type': 'line',
      //     'source': {
      //       'type': 'geojson',
      //       'data': {
      //         'type': 'Feature',
      //         'properties': {},
      //         'geometry': {
      //           'type': 'LineString',
      //           'coordinates': [
      //             [-122.48369693756104, 37.83381888486939],
      //             [-122.48348236083984, 37.83317489144141],
      //             [-122.48339653015138, 37.83270036637107],
      //             [-122.48356819152832, 37.832056363179625],
      //             [-122.48404026031496, 37.83114119107971],
      //             [-122.48404026031496, 37.83049717427869],
      //             [-122.48348236083984, 37.829920943955045],
      //             [-122.48356819152832, 37.82954808664175],
      //             [-122.48507022857666, 37.82944639795659],
      //             [-122.48610019683838, 37.82880236636284],
      //             [-122.48695850372314, 37.82931081282506],
      //             [-122.48700141906738, 37.83080223556934],
      //             [-122.48751640319824, 37.83168351665737],
      //             [-122.48803138732912, 37.832158048267786],
      //             [-122.48888969421387, 37.83297152392784],
      //             [-122.48987674713133, 37.83263257682617],
      //             [-122.49043464660643, 37.832937629287755],
      //             [-122.49125003814696, 37.832429207817725],
      //             [-122.49163627624512, 37.832564787218985],
      //             [-122.49223709106445, 37.83337825839438],
      //             [-122.49378204345702, 37.83368330777276]
      //           ]
      //         }
      //       }
      //     },
      //     'layout': {
      //       'line-join': 'round',
      //       'line-cap': 'round'
      //     },
      //     'paint': {
      //       'line-color': 'red',
      //       'line-width': 8
      //     }
      //   });
      // }
      function addLayer() {
        map.addSource('point', {
          'type': 'geojson',
          'data': point_details
        });
        map.addLayer({
          'id': 'point',
          'source': 'point',
          'type': 'circle',
          'paint': {
            'circle-radius': 10,
            'circle-color': '#A03838'
          }
        });
      }

      addLayer();
      const mapinterval = window.setInterval(async () => {
        const new_details = JSON.parse(await this.extrasProvider.getStorage('location_data'));
        if (new_details != null) {
          map.getSource('point').setData(new_details);
          map.flyTo({center: new_details['features'][0]['geometry'].coordinates});
        }

      }, 4000);
      await this.extrasProvider.setStorage('mapinterval', mapinterval.toString());

    });
    this.loading.dismiss();
  }

  async saveData() {
    const point_details = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [this.Coordinates.longitude, this.Coordinates.latitude]
        },
        'properties': {
          'marker-color': '#ff8888',
          'title': 'Mapbox',
          'description': 'Washington, D.C.',
          'marker-symbol': 'default_marker'
        }
      }]
    };
    await this.extrasProvider.setStorage('location_data', JSON.stringify(point_details));
  }

  openPage() {

  }

  footerExpanded() {
    console.log('Footer expanded!');
  }

  footerCollapsed() {
    console.log('Footer collapsed!');
  }

  toggleFooter() {
    // this.footerState = this.footerState === IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  reset() {
    this.running = false;
    this.stoprunning = true;
    this.disable = true;
    this.unsubscribe();
    this.times = [0, 0, 0, 0];
    this.print();
  }

  unsubscribe() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  async saveBothData(type) {
    this.getCoordinate().then(async (coordinate) => {
      if (type === 'start') {
        if (coordinate['success'] === 'true') {
          await this.extrasProvider.setStorage('item_start', new Date().toString());
          await this.extrasProvider.setStorage('item_start_coordinate', JSON.stringify([coordinate['result']['longitude'], coordinate['result']['latitude']]));
        }
      } else {
        if (coordinate['success'] === 'true') {
          await this.extrasProvider.setStorage('item_end', new Date().toString());
          await this.extrasProvider.setStorage('item_end_coordinate', JSON.stringify([coordinate['result']['longitude'], coordinate['result']['latitude']]));
        }
      }
    });
  }

  getCoordinate(): Promise<any> {
    return new Promise<any>(resolve => {
      this.geolocation.getCurrentPosition().then((position) => {
        resolve({
          'success': 'true',
          'result': {longitude: position.coords.longitude, latitude: position.coords.latitude}
        });
      }).catch((error) => {
        this.apiCalls.getLocation().subscribe(data => {
          const latLong = data['loc'].split(',');
          const coordinate = {'longitude': latLong[0], 'latitude': latLong[1]};
          resolve({'success': 'true', 'result': coordinate});
        }, error => {
          console.log(error);
          resolve({'success': 'false'});
        });
      });
    });

  }

  start() {
    if (!this.time) {
      this.time = performance.now();
    }
    if (!this.running) {
      this.running = true;
      this.stoprunning = false;
      // this.saveBothData('start');
      this.timer = interval(2000);
      this.subscription = this.timer.subscribe(x => {
        this.getCoordinate().then((coordinate) => {
          if (coordinate['success'] === 'true') {
            this.Coordinates = coordinate['result'];
            this.saveData();
            this.saveWorkout(coordinate['result']);
          }
        });
      });

      requestAnimationFrame(this.step.bind(this));
    }

  }

  pause() {
    this.running = false;
    this.stoprunning = false;
    this.disable = false;
    this.time = null;
    // this.saveBothData('end');
    this.unsubscribe();
  }

  stop() {
    this.running = false;
    this.stoprunning = false;
    this.disable = false;
    this.time = null;
    // this.saveBothData('end');
    this.unsubscribe();
  }

  async addToWorkout() {
    let list_of_workout = JSON.parse(await this.extrasProvider.getStorage('workout'));
    const list_of_lang = JSON.parse(await this.extrasProvider.getStorage('workoutlongitude'));
    const max_date = new Date(Math.max.apply(null, list_of_lang.map(function (e) {
      return new Date(e.date);
    })));
    const min_date = new Date(Math.min.apply(null, list_of_lang.map(function (e) {
      return new Date(e.date);
    })));
    const origin = list_of_lang.filter(function (e) {
      if (new Date(e.date) === max_date) {
        return e;
      }

    });
    const destination = list_of_lang.filter(function (e) {
      if (new Date(e.date) === min_date) {
        return e;
      }
    });
    console.log(max_date);
    console.log(origin);
    console.log(destination);
    if (origin.length === 0 || destination.length === 0) {
      this.extrasProvider.presentToast('Something went wrong while trying to save your workout, are you sure you left your position ?');

    } else {
      // var origin = JSON.parse(await this.extrasProvider.getStorage('item_start_coordinate'));
      // var destination = JSON.parse(await this.extrasProvider.getStorage('item_end_coordinate'));
      const features = {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            origin,
            destination
          ]
        }
      };
      console.log(features);
      // Calculate the distance in kilometers between route start/end point.
      try {
        const lineDistance = turf.lineDistance(features, 'kilometers');

        console.log(lineDistance);
        const new_list = {};
        if (list_of_workout != null) {
          new_list['distance'] = lineDistance;
          new_list['type'] = this.type;
          new_list['time'] = new Date();
          list_of_workout.push(new_list);
        } else {
          list_of_workout = [];
          new_list['distance'] = lineDistance;
          new_list['time'] = new Date();
          new_list['type'] = this.type;
          list_of_workout.push(new_list);

        }
        await this.extrasProvider.setStorage('workout', JSON.stringify(list_of_workout));

      } catch (err) {
        console.log(err.message);
        this.extrasProvider.presentToast('Something went wrong while trying to save your workout, are you sure you left your position ?');
      }
    }
    await this.extrasProvider.removeStorage('workoutlongitude');


  }

  async saveWorkout(location_data) {
    let list_of_workout = JSON.parse(await this.extrasProvider.getStorage('workoutlongitude'));
    if (list_of_workout != null) {
      list_of_workout.push({date: new Date(), coordinate: [location_data['longitude'], location_data['latitude']]});
    } else {
      list_of_workout = [];
      list_of_workout.push({date: new Date(), coordinate: [location_data['longitude'], location_data['latitude']]});
    }
    await this.extrasProvider.setStorage('workoutlongitude', JSON.stringify(list_of_workout));
  }

  step(timestamp) {
    if (!this.running) {
      return;
    }
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    const diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[3] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[3] >= 100) {
      this.times[2] += 1;
      this.times[3] -= 100;
    }
    // Minutes are 60 seconds
    if (this.times[2] >= 60) {
      this.times[1] += 1;
      this.times[2] -= 60;
    }
    // Hours are 60 Minutes
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${this.pad0(times[0], 2)}:${this.pad0(times[1], 2)}:${this.pad0(Math.floor(times[2]), 2)}`;
  }

  pad0(value, count) {
    let result = value.toString();
    for (; result.length < count; --count) {
      result = '0' + result;
    }
    return result;
  }

}
