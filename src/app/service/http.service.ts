import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { isObject } from 'util';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  isLoadingOpen = false;
  constructor(
      private http: HttpClient,
      private loadingCtrl: LoadingController
  ) { }

  public postForToaken(
      url: string,
      params: any,
      successCallback,
      errorCallback
  ): any {
    // 此处使用的post模式为非严格模式，如果要使用严格模式，请把参数放在第二个位置 覆盖null
    return this.http
        .post(url, {
          params: this.encodeComplexHttpParams(params),
          headers: this.getHeaders()
        })
        .subscribe(
            (res: any) => {
              console.log(res);
              this.responseSuccess(res, function(msg) {
                if (successCallback) {
                  successCallback(res, msg);
                }
              });
            },
            err => {
              if (errorCallback) {
                errorCallback(err);
              }
            }
        );
  }
  // get数据
  getForToaken(url: string, params?: any): any {
    return this.http.get(url, {
      params: this.encodeComplexHttpParams(params),
      headers: this.getHeaders()
    });
  }
  GET(
      url: string,
      params: any,
      callback?: (res: any, err: any) => void
  ): void {
    this.http
        .get(url, { params: this.encodeComplexHttpParams(params) })
        .subscribe(
            res => {
              console.log('get res=' + res);
              callback && callback(res, null);
            },
            error => {
              callback && callback(null, error);
            }
        );
  }

  POST(
      url: string,
      params: any,
      callback?: (res: any, error: any) => void
  ): void {
    console.log('POST...');
    this.http.post(url, this.encodeComplexHttpParams(params)).subscribe(
        (res: any) => {
          console.log('POST res=' + res);
          console.log(res);
          callback && callback(res, null);
        },
        err => {
          console.log('POST err=');
          console.log(err);
          this.requestFailed(err);
          callback && callback(null, err);
        }
    );
  }

  //  将复杂的参数组装成字符串
  private paramsString(params: any): string {
    if (!params) return null;
    let str = '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (value === null) continue;

        if (Array.isArray(value)) {
          if (value.length === 0) continue;

          for (let index = 0; index < value.length; index++) {
            let k = key + '[' + index + ']';
            let v = value[index];
            if (str.length > 1) str += '&';
            str += k + '=' + v;
          }
        } else if (isObject(value)) {
          for (const subKey in value) {
            if (value.hasOwnProperty(subKey)) {
              const v = value[subKey];
              if (v === null) { continue; }

              const k = key + '[' + subKey + ']';
              if (str.length > 1) str += '&';
              str += k + '=' + v;
            }
          }
        } else {
          if (str.length > 1) { str += '&'; }
          str += key + '=' + value;
        }
      }
    }
    return str;
  }
  // 参数封装
  private encodeComplexHttpParams(params: any): any {
    if (!params) return null;
    return new HttpParams({ fromString: this.paramsString(params) });
  }

  /*
   * 处理响应的事件
   * @param res
   * @param {Function} error
   */
  private responseSuccess(res: any, callback) {
    if (res.code !== '0') {
      // 失败
      if (res.msg) {
        callback({ code: res.code, msg: res.msg });
      } else {
        const data = res.data;
        let errorMsg = '操作失败！';
        data.map(i => {
          errorMsg = i.errorMsg + '\n';
        });
        callback({ code: res.code, msg: errorMsg });
      }
    } else {
      callback(res);
    }
  }
  /*
   * 处理请求失败事件
   * @param url
   * @param err
   */
  private requestFailed(err) {
    let msg = '请求发生异常';
    const status = err.status;
    console.log('status=' + status);
    if (status === 0) {
      msg = '请求失败，请求响应出错';
    } else if (status === 404) {
      msg = '请求失败，未找到请求地址';
    } else if (status === 500) {
      msg = '请求失败，服务器出错，请稍后再试';
    } else {
      msg = '未知错误，请检查网络';
    }
    return msg;
  }
  /*
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  async showLoading(content: string) {
    if (!this.isLoadingOpen) {
      const loading = await this.loadingCtrl.create({
        message: content,
        duration: 5000,
        translucent: true
      });
      console.log('showLoading....');
      return await loading.present();
    }
  }
  /*
   * 关闭loading
   */
  async hideLoading() {
    console.log('hideLoading....');
    if (this.isLoadingOpen) {
      await this.loadingCtrl.dismiss();
      this.isLoadingOpen = false;
    }
  }
  /*
   * 头部信息获取，主要用于处理token
   */
  private getHeaders() {
    const token = this.getToken();
    console.log(token);
    return token ? new HttpHeaders({ token: token }) : null;
  }
  /*
   * 使用本地缓存的方式来获取token信息
   */
  getToken() {
    return window.localStorage.getItem('app-video-ai-token');
  }

  /*
   * 将token信息保存到本地缓存中 用缓存的形式实现token验证
   * @param token
   */
  setToken(token) {
    // 目前只解析token字段，缓存先只存该字段
    //  + token.name + token.email + token.avatar + token.id + token.time
    // JSON.stringify(token)
    window.localStorage.setItem('app-video-ai-token', token.token);
  }

  /**
   * 清理token
   */
  clearToken() {
    window.localStorage.setItem('app-video-ai-token', null);
  }
}
