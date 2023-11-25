import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-homaalumno',
  templateUrl: './homaalumno.page.html',
  styleUrls: ['./homaalumno.page.scss'],
})


export class HomaalumnoPage {
  
  data: any;
  force?: boolean;

  constructor(private alertController:AlertController) { 
      
  }

  async checkPermission(){
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });
  
    if (status.granted) {
      // the user granted permission
      return true;
    }
  
    return false;
  };

  async startScan() {
    try {
      await this.checkPermission();

      await BarcodeScanner.hideBackground();
      document.getElementById('main-content')?.classList.add('scanner-active');
      document.getElementById('main-content')?.classList.add('ocultar');

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.data = JSON.parse(result.content);
        console.log(this.data);
        BarcodeScanner.showBackground();
        document.getElementById('main-content')?.classList.remove('scanner-active');
        document.getElementById('main-content')?.classList.remove('ocultar');
        const alert = await this.alertController.create({
          header: 'Exito',
          message: JSON.stringify(this.data),
          buttons: ['OK'],
        });
        await alert.present();
      
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al escanear código QR',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
    }
  }

}
