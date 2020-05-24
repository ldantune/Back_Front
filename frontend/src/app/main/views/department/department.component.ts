import { Department } from './../../models/department';
import { DepartmentService } from './../../services/department.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentFormComponent } from './department-form/department-form.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department$: Observable<Department[]>;
  departamentos: MatTableDataSource<Department>;

  displayedColumns = ['name', 'operations'];

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild('ator', { static: false }) atorNome: ElementRef;

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { 
      this.getAll();
    }

  ngOnInit(): void {
    this.getAll();
  }

  // ngAfterViewInit() {
  //   this.departamentos.paginator = this.paginator;
  // }

  getAll() {
    // this.people$ = this.peopleService.getPeople();
    this.departmentService.getDepartment()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((departamento) => {
        this.departamentos = new MatTableDataSource<Department>(departamento);
        this.departamentos.sort = this.sort;
        this.departamentos.paginator = this.paginator;
        this.paginator._changePageSize(this.paginator.pageSize); 
      })
  }

  filtro(filterValue: string) {
    this.departamentos.filter = filterValue.trim().toLowerCase();

    if (this.departamentos.paginator) {
      this.departamentos.paginator.firstPage();
    }
  }

  load() {
    location.reload()
  }

  novoCadastro(){
    this.dialog.open(DepartmentFormComponent, {width: '400px'});
  }

  del(department: Department) {
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.departmentService.del(department)
          .subscribe(() => {
            this.snackBar.open('Departamento excluido com sucesso!', 'OK', { duration: 2000 });
            this.getAll();
          })
      }
    })
  }

  edit(d: Department) {
    this.dialog.open(DepartmentFormComponent, { width: '600px', data: d});
  }

}
