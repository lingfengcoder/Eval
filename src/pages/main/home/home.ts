import { Component, } from '@angular/core';
import { NavController ,App} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public App:App) {
  }

  QRscanner(){
    //关键点从根页面跳转
    this.App.getRootNav().push("QrPage");
  }
}
