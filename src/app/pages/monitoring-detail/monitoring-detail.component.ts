import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServeysService } from 'app/services/serveys.service';


@Component({
  selector: 'app-monitoring-detail',
  templateUrl: './monitoring-detail.component.html',
  styleUrls: ['./monitoring-detail.component.css']
})
export class MonitoringDetailComponent implements OnInit {

  serveyid: number = 0;
  info: any;

  loading: boolean = true;

  constructor(private rutaActiva: ActivatedRoute, private serveyService: ServeysService) {

    this.serveyid = this.rutaActiva.snapshot.params.id;

  }

  ngOnInit() {

    this.getMonitoringDetail();

  }

  getMonitoringDetail() {
    this.serveyService.findOne(this.serveyid).subscribe((res: any) => {
      this.info = res.data
      this.loading = false;
    })
  }

  dateFormat(date:string){

    let fecha = new Date(date);    
    return `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;

  }

}
