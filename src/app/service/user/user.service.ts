import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { HttpService } from '../http.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
      private http: HttpService,
      private router: Router,
      private storage: StorageService
  ) {}
  login(params: any) {
    this.router.navigateByUrl('/home');

/*
    const url1 = 'http://127.0.0.1:3000/sessions.json';
    // 显示等待样式
    this.http.showLoading('努力登录中...');
    return this.http.POST(url1, params, (res, error) => {
      this.http.hideLoading();
      if (error) {
        // 网络请求出现错误
        console.log('err=' + error);
      }
      if (res) {
        // 网络请求成功
        console.log('login success');
        if (res.success) {
          this.storage.write('userInfo', res.data);
          // 成功
          //  this.navCtrl.navigateForward('/home',true,{queryParams:{name:'Tom'}});
          this.router.navigateByUrl('/home');
          // this.router.navigate(['/home'],{queryParams:{name:'Tom'}});
        } else {
          // 失败
          let msg = res.msg;
          if (!msg) {
            msg = '操作失败！';
          }
          console.log(msg);
        }
      }
    });*/
  }
}
