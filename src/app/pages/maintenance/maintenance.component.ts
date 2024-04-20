import { Component, OnInit } from '@angular/core';
import { Question } from 'app/interfaces/Question.interface';
import { QuestionService } from 'app/services/question.service';

declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})

export class MaintenanceComponent implements OnInit {
  public dataTable: DataTable;
  questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {

    this.loadTable();


    this.getQuestions();

  }


  getQuestions() {
    this.questionService.getAll().subscribe((resp: any) => {

      let dataTemp: string[] = [];
      let rows: string[][] = [];

      resp.data.forEach((element: Question) => {

        if (element.description) {
          dataTemp.push(element.description)
        }

        if (element.type) {
          dataTemp.push(element.type)
        }

        if (element?.state) {
          dataTemp.push(element.state ? 'Activo' : 'Inactivo')
        }

        if (element.recommendation || !element.recommendation) {
          dataTemp.push(element.recommendation ? 'Si' : 'No')
        }

        rows.push(dataTemp);
        dataTemp = [];

      });


      console.log(rows);

      this.dataTable.dataRows = rows;

    })
  }


  ngAfterViewInit() {

    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });


    var table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function () {
      var $tr = $(this).closest('tr');

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    });

    // Delete a record
    table.on('click', '.remove', function (e) {
      var $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function () {
      alert('You clicked on Like button');
    });
  }

  loadTable() {
    this.dataTable = {
      headerRow: ['Pregunta', 'Tipo', 'Estado', 'Acepta', 'Acciones'],
      footerRow: ['Pregunta', 'Tipo', 'Estado', 'Acepta', 'Acciones'],
      dataRows: []
    };
  }

}
