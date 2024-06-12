import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Community } from 'app/interfaces/Community.interface';
import { Department } from 'app/interfaces/Department.interface';
import { Municipality } from 'app/interfaces/Municipality.interface';
import { CommunitiesService } from 'app/services/communities.service';
import { DepartmentService } from 'app/services/department.service';
import { MunicipalitiesService } from 'app/services/municipalities.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})

export class MaintenanceComponent implements OnInit {

  step: string = ''
  formTbl1: FormGroup;
  loading: boolean = true;
  validForm: boolean = true;
  departments: Department[] = [];
  municialities: Municipality[] = [];
  communities: Community[] = [];

  communityId: number = 0;
  municipalityId: number = 0;
  departmentId: number = 0;
  familiapriorizada: number = 0;

  departmetService = inject(DepartmentService);
  municipalitiesService = inject(MunicipalitiesService);
  communitiesService = inject(CommunitiesService);
  router = inject(Router);


  constructor() { }

  ngOnInit(): void {
    this.getDepartements();

    this.loading = false;
  }


  getDepartements() {
    this.departmetService.getAll().subscribe((response: any) => this.departments = response.data)
  }

  getMunicipalitiesByDeparment(event: any) {
    let departmentId: number = event.target.value;
    this.communities = [];
    this.municialities = [];

    this.departmentId = Number(departmentId);

    this.municipalitiesService.getByDepartmentId(departmentId).subscribe(((res: any) => {
      this.municialities = res.data;
    }));
  }

  getMunicipalities(event: any) {
    let municipalityId: number = event.target.value;

    this.municipalityId = Number(municipalityId);

    this.communitiesService.getByCommunityByMunicipalityId(municipalityId).subscribe(((res: any) => {
      this.communities = res.data;
    }));
  }


  onSubmit() {

    if (this.communityId == 0 || this.departmentId == 0 || this.municipalityId == 0 || this.familiapriorizada == 0) {
      this.validForm = false;
    }

    if (true) {

      let req = {
        communityId: this.communityId,
        departmentId: this.departmentId,
        municipalityId: this.municipalityId,
        familiapriorizada: this.familiapriorizada
      }

      //llamada al servicio

      //redireccionar a la parte 2
      console.log(req)

      this.router.navigateByUrl('monitoring/paso-2/' + this.communityId);

      

    }

  }

}
