import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-homing',
  templateUrl: './homing.page.html',
  styleUrls: ['./homing.page.scss'],
})
export class HomingPage implements OnInit {

  searchQuery: any = '';
  private cItem: any;

  constructor(
      private http: HttpClient
  ) { }

  getItems(ev: any) {
    const val = ev.target.value;
    this.http.get( 'http://127.0.0.1:3000/homings.json?key=' + val ).subscribe( ( data: any) => {
      this.cItem = data.result;
      console.log(this.cItem);
    });
  }
  itemSelected(item: any) {
    console.log(item);
  }
  ngOnInit() {
    this.http.get( 'http://127.0.0.1:3000/homings.json?facility_id=5cc6c62488dba063c4048a25').subscribe( ( data: any) => {
      this.cItem = data.result;
      console.log(this.cItem);
    });
  }

}
