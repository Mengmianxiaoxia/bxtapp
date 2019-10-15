import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  // 向储存服务storage中写入数据
  write( key: string, value: any) {
    if (!key) {
      return;
    }
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  // 从储存服务storage中读取主句
  read<T>( key: string): T {
    if (!key) {
      return null;
    }
    const value: string = localStorage.getItem(key);
    if (value && value !== 'undefined' && value !== 'null') {
      return <T> JSON.parse(value);
    } else {
      return null;
    }
  }
  // 根据key删除对应storage中的数据
  remove( key: string) {
    if (!key) {
      return;
    }
    localStorage.removeItem(key);
  }
  // 清空storage
  clear() {
    localStorage.clear();
  }
}
