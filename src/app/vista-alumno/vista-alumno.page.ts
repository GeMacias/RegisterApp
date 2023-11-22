import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '../Servicios/db.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.page.html',
  styleUrls: ['./vista-alumno.page.scss'],
})
export class VistaAlumnoPage implements OnInit, OnDestroy{

  constructor(private dbService: DbService) { }

  scannedResult : any;
  ngOnInit() {
  }
  async checkPermission() {
    try{
      const status=await BarcodeScanner.checkPermission({force:true});
      if (status.granted){
        return true;
      }
      return false;
    }catch (e){
      console.log(e);
    }return false;
  } 

  async startScan(){
    try{
      const permission = await this.checkPermission();
      if(!permission){
        return false;
      }
      await BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan();
      document.querySelector('body')?.classList.add('scanner-activate')
      console.log(result);
      if(result.hasContent){
        this.scannedResult = result.content;
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-activate')
        console.log(this.scannedResult);
      }
    } catch(e){
      console.log(e);
      this.stopScan();
    }return
  } 

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-activate')
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
