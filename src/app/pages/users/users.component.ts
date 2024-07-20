import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data: any[] = [];
  currenUser: any;

  constructor(private userService: UsersService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {
    this.userService.findAll().subscribe((resp: any) => {
      this.data = resp.users;
    });
  }

  removeUser(id: string) {


    Swal.fire({
      title: "Eliminar usuario",
      text: 'Usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar el usuario!',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: "btn btn-fill btn-success btn-mr-5",
        cancelButton: "btn btn-fill btn-danger",
      },
      buttonsStyling: false
    }).then((result) => {

      if (result.value) {

        this.userService.remove(id).subscribe(
          response => {
            console.log(response)
            Swal.fire({
              title: 'Eliminado!',
              text: 'Your imaginary file has been deleted.',
              icon: 'success',
              customClass: {
                confirmButton: "btn btn-fill btn-success",
              },
              buttonsStyling: false
            });
            this.getUsers();
          },

          error => {

            console.log(error)

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
        )
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'La accion ha sido cancelada',
          icon: 'error',
          customClass: {
            confirmButton: "btn btn-fill btn-info",
          },
          buttonsStyling: false
        })
      }
    })

  }

}

