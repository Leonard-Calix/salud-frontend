import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-step1',
  templateUrl: './form-step1.component.html',
  styleUrls: ['./form-step1.component.css']
})
export class FormStep1Component implements OnInit {

  formTbl1: FormGroup;
  loading: boolean = true;

  @Output() newItemEvent = new EventEmitter<string>();


  ngOnInit(): void {
    this.formTbl1 = new FormGroup({
      deparmento: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      aldea: new FormControl('', [Validators.required]),
      cantdadFamilias: new FormControl('', [Validators.required]),
    });

    this.loading = false;
  }

  onSubmitTbl1() {

    //this.notification('step_2');
  }

  notification(value: string) {

    console.log('Emitiendo ', value)

    this.newItemEvent.emit(value);
  }

}
