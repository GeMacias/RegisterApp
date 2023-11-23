import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { IonAvatar,IonModal } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private router: Router, 
    private activatedRouter: ActivatedRoute,) { }

  public alertButtons = ['OK'];
  public user = {
    username: "",
    password: "",
    rol:""
  }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.username = state['user'].username;
        this.user.password = state['user'].password;
        this.user.rol= state['user'].rol;
        console.log(this.user);
      }
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
