import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../service/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  status = true;
  constructor(
      private navCtrl: NavController,
      private userService: UserService,
  ) { }

  ngOnInit() {
  }
  onLogin() {
    this.userService.login({
      username: 'super',
      password: 'bxt-super'
      // version: '18'
    });
  }
  toRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
