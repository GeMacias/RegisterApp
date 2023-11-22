import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-vista-profe',
  templateUrl: './vista-profe.page.html',
  styleUrls: ['./vista-profe.page.scss'],
})
export class VistaProfePage implements OnInit, OnDestroy{

  constructor(private router: Router, 
    private activatedRouter: ActivatedRoute,) { }
  
    public user = {
      username: "",
      password: ""
    }
    qrCodeString = 'Presente';
    scanResult: any;

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
          this.scanResult = result.content;
          BarcodeScanner.showBackground();
          document.querySelector('body')?.classList.remove('scanner-activate')
          console.log(this.scanResult);
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
  
  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.username = state['user'].username;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }
  ngOnDestroy(): void {
    this.stopScan();
  }

}
