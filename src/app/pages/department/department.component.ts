import { Component } from '@angular/core';
declare var $:any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
  
})
export class DepartmentComponent {
  public dataTable: DataTable;
    ngOnInit(){
        this.dataTable = {
            headerRow: [ 'Nombre Departamento', 'Estado del Departamento', 'Fecha', 'Acciones' ],
            footerRow: [ 'Nombre Departamento', 'Estado del Depàrtamento', 'Fecha', 'Acciones' ],
            dataRows: [
                ['Francisco Morazan', 'Activo', '2013',''],
                ['Atlantida', 'Activo', '2012', 'btn-round'],
                ['Choluteca', 'Activo', '2010', 'btn-simple'],
                ['Intibuca','Activo', '2013','btn-round']                          
            ]
         };
    }

    ngAfterViewInit(){

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
        table.on( 'click', '.edit', function () {
            var $tr = $(this).closest('tr');

            var data = table.row($tr).data();
            alert( 'You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.' );
        } );

        // Delete a record
        table.on( 'click', '.remove', function (e) {
            var $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        } );

        //Like record
        table.on( 'click', '.like', function () {
            alert('You clicked on Like button');
        });
    }
}
