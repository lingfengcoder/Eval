import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {
    protected light: boolean = false;
    protected frontCamera: boolean = false;
    protected scanSub: any;
    constructor(
      private qrScanner: QRScanner,
      public viewCtrl: ViewController
    ) {
    }
     dismiss(){
      this.viewCtrl.dismiss();
    }
  
    toggleLight() {
      this.light = !this.light;
      if (this.light) {
        this.qrScanner.enableLight();
      } else {
        this.qrScanner.disableLight();
      }
    }
    toggleCamera() {
      this.frontCamera = !this.frontCamera;
      if (this.frontCamera) {
        this.qrScanner.useFrontCamera();
      } else {
        this.qrScanner.useBackCamera();
      }
    }
  
    ionViewDidLoad() {
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted
            // start scanning
            this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
              // alert(text);
              //console.log(text);
              this.qrScanner.hide(); // hide camera preview
              this.scanSub.unsubscribe(); // stop scanning
            });
            // show camera preview
            this.qrScanner.show();
            // wait for user to scan something, then the observable callback will be called
          } else if (status.denied) {
            this.qrScanner.openSettings();
          } else {
            this.qrScanner.openSettings();
            // permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        }).catch((e: any) => //
          console.log('Error is', e));
    }
    ionViewCanLeave() {
      //console.log("QR-->ionViewCanLeave");
      this.qrScanner.disableLight();
      this.qrScanner.hide(); // hide camera preview
      this.qrScanner.destroy();
      if (this.scanSub != null) this.scanSub.unsubscribe(); // stop scanning 
    }
  
}
