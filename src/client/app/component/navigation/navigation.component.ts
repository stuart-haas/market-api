import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user;

  constructor(public api: ApiService) {
    this.api.get('users/session')
    .subscribe(data => {
      this.user = data
    });
   }

  ngOnInit() {
  }

}
