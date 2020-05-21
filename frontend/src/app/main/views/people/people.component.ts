import { Person } from '../../models/person';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Person[]>;
  pessoas: MatTableDataSource<Person>;

  displayedColumns = ['name', 'country', 'email', 'company'];

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild('ator', { static: false }) atorNome: ElementRef;

  constructor(private peopleService: PersonService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    // this.people$ = this.peopleService.getPeople();
    this.peopleService.getPeople()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((pessoa) => {
        this.pessoas = new MatTableDataSource<Person>(pessoa);
        this.pessoas.sort = this.sort;
        this.pessoas.paginator = this.paginator
      })
  }

  filtro(filterValue: string) {
    this.pessoas.filter = filterValue.trim().toLowerCase();

    if (this.pessoas.paginator) {
      this.pessoas.paginator.firstPage();
    }
  }

}
