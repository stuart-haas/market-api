import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../model/User';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user;

  constructor(public api: ApiService, public router: Router) { 
    this.api.get('users/session')
    .subscribe(data => {
      this.user = data
    });
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const formValues = Object.assign({}, form.value);

    const user: User = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      passwordConf: formValues.passwordConf
    }

    this.api.post('users/update', user)
      .subscribe(data => {
        this.router.navigate(['/dashboard'])
      })
  }
}
