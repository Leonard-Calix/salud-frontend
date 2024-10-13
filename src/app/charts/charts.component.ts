import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { LegendItem, ChartType, LbdChartComponent } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { GraphicsService } from 'app/services/graphics.service';
import { Department } from 'app/interfaces/Department.interface';
import { Municipality } from 'app/interfaces/Municipality.interface';
import { Community } from 'app/interfaces/Community.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServeysService } from 'app/services/serveys.service';
import { CommunitiesService } from 'app/services/communities.service';
import { MunicipalitiesService } from 'app/services/municipalities.service';
import { DepartmentService } from 'app/services/department.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'charts-cmp',
  templateUrl: './charts.component.html'
})

export class ChartsComponent implements OnInit {
  public dataChartType: ChartType;
  public dataChartData: any;
  public dataChartOptions: any;

  public data2ChartType: ChartType;
  public data2ChartData: any;
  public data2ChartOptions: any;

  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public desnutricionChartType: ChartType;
  public desnutricionChartData: any;
  public desnutricionemailChartLegendItems: LegendItem[];

  public generoChartType: ChartType;
  public generoChartData: any;
  public generoChartLegendItems: LegendItem[];

  //INICIO NUEVOS GRAFICO
  public n1ChartType: ChartType;
  public n1ChartData: any;
  public n1ChartLegendItems: LegendItem[];

  public n2ChartType: ChartType;
  public n2ChartData: any;
  public n2ChartLegendItems: LegendItem[];

  public n3ChartType: ChartType;
  public n3ChartData: any;
  public n3ChartLegendItems: LegendItem[];

  //FIN NUEVOS GRAFICO


  graphicsService = inject(GraphicsService);

  loading: boolean = true;
  @ViewChild('pieChart') pieChartComponent!: LbdChartComponent
  @ViewChild('pieChartD') pieDesnutricionChartComponent!: LbdChartComponent
  @ViewChild('pieChartN') pieNinosChartComponent!: LbdChartComponent
  @ViewChild('pieChartN1') chartN1Component!: LbdChartComponent
  @ViewChild('pieChartN2') chartN2Component!: LbdChartComponent
  @ViewChild('pieChartN3') chartN3Component!: LbdChartComponent

  departments: Department[] = [];
  municipalities: Municipality[] = [];
  communities: Community[] = [];
  datosGeneralFamiliasAtendidas: any[] = [];

  communityId: string = '0';
  municipalityId: string = '0';
  departmentId: string = '0';
  trimestre: string = '0';
  anio: string = '0'

  formFilter = new FormGroup({
    departmentId: new FormControl('0', [Validators.required]),
    municipalityId: new FormControl('0', [Validators.required]),
    communityId: new FormControl('0', [Validators.required]),
    trimestre: new FormControl('0', [Validators.required]),
    anio: new FormControl('2024', [Validators.required]),
  });

  constructor(
    private readonly deparmentService: DepartmentService,
    private readonly municipalitiesService: MunicipalitiesService,
    private readonly communitiesService: CommunitiesService,
  ) {

  }

  ngOnInit() {

    //GRAFICO DE PASTEL DE PROGRAMADAS/EJECUTADAS
    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: ['0%', '0%'],
      series: [0, 100]
    };
    this.emailChartLegendItems = [
      { title: 'Ejecutadas', imageClass: 'fa fa-circle text-info' },
      { title: 'No Ejecutadas', imageClass: 'fa fa-circle text-danger' },
    ];

    //GRAFICO DE DESNUTRICION
    this.desnutricionChartType = ChartType.Pie;
    this.desnutricionChartData = {
      labels: ['0%', '0%'],
      series: [100, 0]
    };

    this.desnutricionemailChartLegendItems = [
      { title: 'Sin tratamiento', imageClass: 'fa fa-circle text-info' },
      { title: 'Con tratamiento', imageClass: 'fa fa-circle text-danger' },
    ];

    //GRAFICO DE NIÑO
    this.generoChartType = ChartType.Pie;
    this.generoChartData = {
      labels: ['0%', '0%'],
      series: [100, 0]
    };

    this.generoChartLegendItems = [
      { title: 'Femenino', imageClass: 'fa fa-circle text-info' },
      { title: 'Masculino', imageClass: 'fa fa-circle text-danger' },
    ];

    //GRAFICOS NUEVOS

    //chartN1Component
    this.n1ChartType = ChartType.Pie;
    this.n1ChartData = {
      labels: ['0%', '0%'],
      series: [100, 0]
    };

    this.n1ChartLegendItems = [
      { title: 'POR DEFINIR N1', imageClass: 'fa fa-circle text-info' },
      { title: 'POR DEFINIR N1', imageClass: 'fa fa-circle text-danger' },
    ];

    //chartN1Component
    this.n2ChartType = ChartType.Pie;
    this.n2ChartData = {
      labels: ['0%', '0%'],
      series: [100, 0]
    };

    this.n2ChartLegendItems = [
      { title: 'POR DEFINIR N2', imageClass: 'fa fa-circle text-info' },
      { title: 'POR DEFINIR N2', imageClass: 'fa fa-circle text-danger' },
    ];

    //chartN1Component
    this.n3ChartType = ChartType.Pie;
    this.n3ChartData = {
      labels: ['0%', '0%'],
      series: [100, 0]
    };

    this.n3ChartLegendItems = [
      { title: 'POR DEFINIR N3', imageClass: 'fa fa-circle text-info' },
      { title: 'POR DEFINIR N3', imageClass: 'fa fa-circle text-danger' },
    ];

    //FIN GRAFICOS NUEVOS

    this.dataChartOptions = {
      showPoint: false,
      lineSmooth: true,
      height: "260px",
      axisX: {
        showGrid: false,
        showLabel: true
      },
      axisY: {
        offset: 40,
      },
      low: 0,
      high: 16
    };

    this.getDeparments();

  }

  getGrafico1() {

    this.datosGeneralFamiliasAtendidas = [];

    if (!this.validarFormulario()) {

      Swal.fire({
        title: 'Error',
        text: 'Formulario invalido',
        icon: 'error',
        customClass: {
          confirmButton: "btn btn-fill btn-info",
        },
        buttonsStyling: false
      })
      return;
    }

    let req = {
      anio: Number(this.anio),
      fechaFinal: this.getTrimestres(this.trimestre)[1],
      fechaInicial: this.getTrimestres(this.trimestre)[0],
      monitoreoId: Number(this.communityId)
    };

    let reqGeneral = {
      anio: Number(this.anio),
      communityId: Number(this.communityId)
    };

    this.graphicsService.getGraphicsFamiliasAtendidas(req)
      .subscribe((response: any) => {

        const { PEjecutadas, PNoEjecutadas } = response.data;

        if (response.ok) {
          let temp1 = [String(PEjecutadas).concat('%'), String(PNoEjecutadas).concat('%')];
          let temp2 = [PEjecutadas, PNoEjecutadas];

          this.emailChartData = {
            labels: temp1,
            series: temp2
          };
          this.pieChartComponent.updatePieChart('lbd-chart-1', this.emailChartData);
          this.pieChartComponent.footerText = 'Consulta exitosa';
        } else {
          this.emailChartData = {
            labels: ['0%', '0%'],
            series: [0, 0]
          };
          this.pieChartComponent.updatePieChart('lbd-chart-1', this.emailChartData);
          this.pieChartComponent.footerText = 'No hay rergistros que mostrar para esa fecha';
        }
      });

    this.graphicsService.getGraphicsDesnutricion(req)
      .subscribe((response: any) => {
        if (response.ok) {

          const { data } = response;

          let temp1 = [String(data.noDesnutridos).concat('%'), String(data.desnutridos).concat('%')];
          let temp2 = [data.noDesnutridos, data.desnutridos];

          this.desnutricionChartData = {
            labels: temp1,
            series: temp2
          };
          this.pieDesnutricionChartComponent.updatePieChart('lbd-chart-2', this.desnutricionChartData);
          this.pieDesnutricionChartComponent.footerText = 'Consulta exitosa';

        } else {
          this.desnutricionChartData = {
            labels: ['0%', '0%'],
            series: [0, 0]
          };
          this.pieDesnutricionChartComponent.updatePieChart('lbd-chart-2', this.desnutricionChartData);
          this.pieDesnutricionChartComponent.footerText = 'No hay rergistros que mostrar para esa fecha';
        }
      });

    this.graphicsService.getGraphicsNinos(req)
      .subscribe((response: any) => {

        if (response.ok) {

          const { data } = response;

          let temp1 = [String(data.pFemenino).concat('%'), String(data.pMasculino).concat('%')];
          let temp2 = [data.pFemenino, data.pMasculino];

          this.generoChartData = {
            labels: temp1,
            series: temp2
          };
          this.pieNinosChartComponent.updatePieChart('lbd-chart-3', this.generoChartData);
          this.pieNinosChartComponent.footerText = 'Consulta exitosa';

        } else {
          this.desnutricionChartData = {
            labels: ['0%', '0%'],
            series: [0, 0]
          };
          this.pieNinosChartComponent.updatePieChart('lbd-chart-3', this.generoChartData);
          this.pieNinosChartComponent.footerText = 'No hay rergistros que mostrar para esa fecha';
        }

      });

    this.graphicsService.getGraphicsGeneral(reqGeneral)
      .subscribe((res: any) => {

        let response = res.data;

        let item = {
          label: '% de Familias Atendidas',
          primer: response[0].programadas ? ((response[0].ejecutadas / response[0].programadas) * 100) : 0, //25
          segundo: response[1].programadas ? ((response[1].ejecutadas / response[1].programadas) * 100) : 0, //10
          tercero: response[2].programadas ? ((response[2].ejecutadas / response[2].programadas) * 100) : 0, //45
          cuarto: response[3].programadas ? ((response[3].ejecutadas / response[3].programadas) * 100) : 0, //45
          total: 0
        }

        let temp2 = { ...item }

        temp2.total = (item.primer + item.segundo + item.tercero + item.cuarto) / 4;

        this.datosGeneralFamiliasAtendidas.push(temp2);

      });

    this.loading = false;
  }

  getDeparments() {
    this.deparmentService.getAll()
      .subscribe((res: any) => this.departments = res.data);
  }

  getMunicipalitiesByDeparment(event: any) {
    let departmentId: string = event.target.value;
    this.communities = [];
    this.municipalities = [];

    this.departmentId = departmentId;

    this.municipalitiesService.getByDepartmentId(Number(departmentId))
      .subscribe(((res: any) => this.municipalities = res.data));
  }

  getCommunities(event: any) {
    let municipalityId: string = event.target.value;

    this.municipalityId = municipalityId;

    this.communitiesService.getByCommunityByMunicipalityId(Number(municipalityId))
      .subscribe((res: any) => this.communities = res.data);
  }

  getTrimestres(trimestre: string) {
    if (trimestre === '1') {
      return ['2024-01-01', '2024-04-01']
    }
    if (trimestre === '2') {
      return ['2024-04-01', '2024-06-01']
    }
    if (trimestre === '3') {
      return ['2024-06-01', '2024-09-01']
    }
    if (trimestre === '4') {
      return ['2024-09-01', '2024-12-01']
    }
  }

  validarFormulario(): boolean {

    if (this.departmentId == '0' || this.municipalityId == '0' || this.communityId == '0' || this.anio == '0' || this.trimestre == '0') {
      return false
    }
    return true;
  }

}
