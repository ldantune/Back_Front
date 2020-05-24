import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    'email':  ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  })

  loading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const crendentials = this.loginForm.value;
    this.loading = true;
    this.authService.login(crendentials)
      .subscribe(
        (user) => {
          console.log(user);
          this.snackBar.open(
            'Login Realizado com Sucesso. Bem Vindo' + user.firstname + '!', 'Ok',
            {duration: 2000});
            this.route.navigateByUrl('/');
            this.loading = false;
        },
        (err) => {
          console.log(err);
          this.snackBar.open(
            'Erro ao realizar login', 'Ok', {duration: 2000});
            this.loading = false;
        }
      )
  }

}
