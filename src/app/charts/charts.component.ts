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

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public viewsChartType: ChartType;
  public viewsChartData: any;
  public viewsChartOptions: any;
  public viewsChartResponsive: any[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];

  graphicsService = inject(GraphicsService);

  loading: boolean = true;
  @ViewChild('pieChart') pieChartComponent!: LbdChartComponent
  @ViewChild('barChart') barChart1Componen!: LbdChartComponent
  @ViewChild('barChart') barChart2Componen!: LbdChartComponent

  departments: Department[] = [];
  municipalities: Municipality[] = [];
  communities: Community[] = [];

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
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {

    this.emailChartType = ChartType.Pie;
    this.emailChartData = {
      labels: ['62%', '38%'],
      series: [62, 38]
    };
    this.emailChartLegendItems = [
      { title: 'Ejecutadas', imageClass: 'fa fa-circle text-info' },
      { title: 'No Ejecutadas', imageClass: 'fa fa-circle text-danger' },
    ];

    this.dataChartType = ChartType.Line;
    this.dataChartData = {
      labels: ['6pm', '9pm', '11pm', '2am', '4am', '8am', '2pm', '5pm', '8pm', '11pm', '4am'],
      series: [
        [1, 6, 8, 7, 4, 7, 8, 12, 16, 17, 14, 13]
      ]
    };

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

    this.data2ChartType = ChartType.Line;
    this.data2ChartData = {
      labels: ['\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
      series: [
        [22.20, 34.90, 42.28, 51.93, 62.21, 80.23, 62.21, 82.12, 102.50, 107.23]
      ]
    };
    this.data2ChartOptions = {
      lineSmooth: false,
      height: "260px",
      axisY: {
        offset: 40,
        labelInterpolationFnc: function (value) {
          return '$' + value;
        }

      },
      low: 10,
      high: 110,
      classNames: {
        point: 'ct-point ct-green',
        line: 'ct-line ct-green'
      }
    };

    this.hoursChartType = ChartType.Line;
    this.hoursChartData = {
      labels: ['\'06', '\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
      series: [
        [287, 385, 490, 554, 586, 698, 695, 752, 788, 846, 944],
        [67, 152, 143, 287, 335, 435, 437, 539, 542, 544, 647],
        [23, 113, 67, 190, 239, 307, 308, 439, 410, 410, 509]
      ]
    };

    this.hoursChartOptions = {
      low: 0,
      high: 1000,
      showArea: false,
      height: '245px',
      axisX: {
        showGrid: true,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: true,
    };

    this.hoursChartResponsive = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    this.hoursChartLegendItems = [
      { title: 'Open', imageClass: 'fa fa-circle text-info' },
      { title: 'Click', imageClass: 'fa fa-circle text-danger' },
      { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
    ];

    this.viewsChartType = ChartType.Bar;
    this.viewsChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
      ]
    };

    this.viewsChartOptions = {
      seriesBarDistance: 10,
      classNames: {
        bar: 'ct-bar ct-azure'
      },
      axisX: {
        showGrid: false
      }
    };

    this.viewsChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    this.activityChartType = ChartType.Bar;
    this.activityChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
      ]
    };

    this.activityChartOptions = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: "245px"
    };

    this.activityChartResponsive = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    this.getDeparments()

  }

  getGrafico1() {

    let req = {
      anio: Number(this.anio),
      fechaFinal: this.getTrimestres(this.trimestre)[1],
      fechaInicial: this.getTrimestres(this.trimestre)[0],
      monitoreoId: Number(this.communityId)
    };

    console.log(req)

    this.graphicsService.getGraphicsFamiliasAtendidas(req).subscribe((response: any) => {

      if (response.data.length > 0) {
        let temp1 = [String(response.data[0].PEjecutadas).concat('%'), String(response.data[0].PNoEjecutadas).concat('%')];
        let temp2 = [response.data[0].PEjecutadas, response.data[0].PNoEjecutadas];

        this.emailChartData = {
          labels: temp1,
          series: temp2
        };

        this.pieChartComponent.updatePieChart('lbd-chart-1', this.emailChartData);
        this.loading = false;
      }

    });
  }


  getDeparments() {
    this.deparmentService.getAll().subscribe(((res: any) => {
      this.departments = res.data;
    }));
  }

  getMunicipalitiesByDeparment(event: any) {
    let departmentId: string = event.target.value;
    this.communities = [];
    this.municipalities = [];

    this.departmentId = departmentId;

    this.municipalitiesService.getByDepartmentId(Number(departmentId)).subscribe(((res: any) => {
      this.municipalities = res.data;
    }));
  }

  getCommunities(event: any) {
    let municipalityId: string = event.target.value;

    this.municipalityId = municipalityId;

    this.communitiesService.getByCommunityByMunicipalityId(Number(municipalityId)).subscribe(((res: any) => {
      this.communities = res.data;
    }));
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

}
