import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css']
})
export class NewUsersComponent {

  formGruopUser = new FormGroup({

    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    userName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),//asd456
    confirmation: new FormControl("", [Validators.required]),
  });

  constructor(private userService: UsersService, private router: Router) {
  }


  create() {


    if (this.formGruopUser.invalid) {
      Swal.fire({
        title: "Error",
        text: "Formulario invalido",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-fill btn-success",
        },
        icon: "warning"
      })
      return;
    }

    if (this.formGruopUser.value.password != this.formGruopUser.value.password) {

      Swal.fire({
        title: "Contraseña",
        text: "Las contraseñas no coinciden",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-fill btn-success",
        },
        icon: "success"
      });
      return;
    }

    if ((this.formGruopUser.value.password == this.formGruopUser.value.password)) {

      this.userService.create(this.formGruopUser.value).subscribe(

        response => {
          console.log(response)
          Swal.fire({
            title: "Exitoso",
            text: "Usuario registrado con exito",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-fill btn-success",
            },
            icon: "success"
          });
          
          this.router.navigateByUrl('/users-list');
        },
        error => {
          Swal.fire({
            title: "Error",
            text: error.error.msg,
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-fill btn-success",
            },
            icon: "error"
          })
        }
      );
    }
  }

}
