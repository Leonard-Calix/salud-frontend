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

    firstName: new FormControl("Gerson", Validators.required),
    lastName: new FormControl("Adonay Moreira", Validators.required),
    userName: new FormControl("gmoreira", Validators.required),
    email: new FormControl("gmoreira@gmail.com", Validators.required),
    password: new FormControl("asd456", Validators.required),
    confirmation: new FormControl("asd456", [Validators.required]),
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


    if ((this.formGruopUser.value.password == this.formGruopUser.value.password)) {

      

      this.userService.create(this.formGruopUser.value).subscribe({

        complete() {
          Swal.fire({
            title: "Exitoso",
            text: "Usuario registrado con exito",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-fill btn-success",
            },
            icon: "success"
          });
        },

        

        error(err) {
          console.log(err)

          Swal.fire({
            title: "Error",
            text: err.error.msg,
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-fill btn-success",
            },
            icon: "error"
          })
        },

      });


    } else {
      Swal.fire({
        title: "Contraseña",
        text: "Las contraseñas no coinciden",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-fill btn-success",
        },
        icon: "success"
      })
    }
  }

}
