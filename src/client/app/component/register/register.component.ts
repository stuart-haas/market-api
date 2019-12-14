import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public api: ApiService, public router: Router) { }

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

    this.api.post('users/register', user)
      .subscribe(data => {
        form.reset();
        this.router.navigate(['/login'])
      })
  }

}
