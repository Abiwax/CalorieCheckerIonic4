import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IonicModule} from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import {PopoverPage} from './pages/popover/popover';
import {ModalPage} from './components/modal/modal';
import {ApiCallsProvider} from './providers/api-calls/api-calls';
import {ExtrasProvider} from './providers/extras/extras';
import {UtilProvider} from './providers/extras/util';
import {ConnectionServiceProvider} from './providers/connection-service/connection-service';
import {GetSetProvider} from './providers/get-set/get-set';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  entryComponents: [
    PopoverPage,
    ModalPage
  ],
  declarations: [AppComponent, PopoverPage, ModalPage],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    ApiCallsProvider,
    ExtrasProvider,
    UtilProvider,
    ConnectionServiceProvider,
    GetSetProvider,
    NativeStorage,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
