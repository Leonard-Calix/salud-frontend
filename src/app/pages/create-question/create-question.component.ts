import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { showSwal } from 'app/helpers/sweetalert';
import { QuestionService } from 'app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  formGrup: FormGroup;
  loading: boolean = true;

  constructor(
    private questionService: QuestionService, private readonly router: Router) {
  }

  ngOnInit(): void {

    this.formGrup = new FormGroup({
      description: new FormControl('', Validators.required),
      type: new FormControl("0", [Validators.required, Validators.min(2)]),
      state: new FormControl("0", [Validators.required, Validators.min(2)]),
      recommendation: new FormControl("0", [Validators.required, Validators.min(2)]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl(''),
    });

    this.loading = false;

  }

  create() {
    this.questionService.create(this.formGrup.value).subscribe((data: any) => {
      if(data.ok){
        this.showMessage();
      }
    });
  }

  showMessage() {
    Swal.fire({
      title: "Registro con exito",
      text: "Desea agregar otra pregunta",
      icon: 'success',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-fill btn-success btn-mr-5',
        cancelButton: 'btn btn-fill btn-danger',
      },
      confirmButtonText: 'Si',
      buttonsStyling: false,

    }).then((result) => {
      if (!result.value) {
        this.router.navigate(['/maintenance'])
      }

      this.formGrup.get('description').setValue('');
      this.formGrup.get('type').setValue('0');
      this.formGrup.get('state').setValue('0');
      this.formGrup.get('recommendation').setValue('0');

    })
  }


}
