import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-step3',
  templateUrl: './form-step3.component.html',
  styleUrls: ['./form-step3.component.css']
})
export class FormStep3Component implements OnInit {

  formTbl1: FormGroup;
  loading: boolean = true;
  communityId: number = 0;

  router = inject(Router);
  rutaActiva = inject(ActivatedRoute);

  ngOnInit(): void {

    this.formTbl1 = new FormGroup({
      ejecutadas: new FormControl('', [Validators.required]),
      programadas: new FormControl('', [Validators.required])
    });

    this.communityId = Number(this.rutaActiva.snapshot.params.communityId);

    this.loading = false;

  }

  onSubmit() {

    console.log(this.formTbl1.value)

    this.router.navigateByUrl('monitoring/paso-3/' + this.communityId);
  }





}
