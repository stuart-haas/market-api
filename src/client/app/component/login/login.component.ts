import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const formValues = Object.assign({}, form.value);

    const user: User = {
      username: formValues.username,
      password: formValues.password
    }

    this.api.post('users/login', user)
      .subscribe(data => {
        form.reset();
        this.router.navigate(['/dashboard'])
      })
  }
}
