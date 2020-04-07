import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalfunctionsProvider } from './services/globalfunctions/globalfunctions';
import { ServiceProvider } from './services/service/service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OcrAPIService } from '../app/services/ocrApi/ocr-api.service';
import { SqlliteProvider } from './services/sqllite/sqllite';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
import { Network } from '@ionic-native/network/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { OCR } from '@ionic-native/ocr/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
//import { Transfer } from '@ionic-native/transfer';
//import { DoclistPage } from "./doclist/doclist.page";
import { HTTP } from '@ionic-native/http/ngx';
import { UserDetailsPage } from './user-details/user-details.page';
import { AadharModalPage } from './aadhar-modal/aadhar-modal.page';
import { PanModalPage } from './pan-modal/pan-modal.page';
import { ShowImagePage } from './show-image/show-image.page';
import { AadharModalPageModule } from './aadhar-modal/aadhar-modal.module';
import { PanModalPageModule } from './pan-modal/pan-modal.module';
import { ShowImagePageModule } from './show-image/show-image.module';
import { PopupModalPage } from './popup-modal/popup-modal.page';
import { PopupModalPageModule } from './popup-modal/popup-modal.module';
import { DoclistPage } from './doclist/doclist.page';
import { DoclistPageModule } from './doclist/doclist.module';
import { ProofModalPage } from './proof-modal/proof-modal.page';
import { ProofModalPageModule } from './proof-modal/proof-modal.module';
import { ModelDocImagePageModule } from './model-doc-image/model-doc-image.module';
import { ModelDocImagePage } from './model-doc-image/model-doc-image.page';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    AadharModalPage,
    PanModalPage,
    ShowImagePage,
    PopupModalPage,
    DoclistPage,
    ProofModalPage,
    ModelDocImagePage    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AadharModalPageModule,
    PanModalPageModule,
    ShowImagePageModule,
    PopupModalPageModule,
    DoclistPageModule,
    ProofModalPageModule,
    ModelDocImagePageModule
  ],
  exports: [],
  providers: [
    UserDetailsPage,
    AadharModalPage,
    PanModalPage,
    ShowImagePage,
    StatusBar,
    SplashScreen,
    File,
    OCR,
    FilePath,
    NativeGeocoder,
    SQLite,
    SQLitePorter,
    SqlliteProvider,
    ServiceProvider,
    OcrAPIService,
    NFC,
    Ndef,
    Camera,
    WebView,
    GlobalfunctionsProvider,
    HTTP,
    Geolocation,
    Device,
    DocumentViewer,
    Network,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
