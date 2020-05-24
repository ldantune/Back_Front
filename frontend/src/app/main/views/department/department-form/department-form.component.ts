import { DepartmentService } from './../../../services/department.service';
import { Department } from './../../../models/department';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {

  title: string;

  formRegister = this.fb.group({
    _id: undefined,
    name: [ '', [Validators.required]],
    
});

  constructor(
    public dialogRef: MatDialogRef<DepartmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public department: Department,

    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { 
    if (this.department != null) {
      this.formRegister.setValue(department);
      this.title = 'Atualização Cadastro Departamento';
    } else {
      this.title = 'Novo Cadastro Departamento';
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let department: Department = this.formRegister.value;
    if (!department._id) {
      this.add(department);
    } else {
      //this.updateDiretor(diretor);
    }
  }

  add(department: Department) {
    this.departmentService.add(department)
      .subscribe(
        (u) => {
          this.snackBar.open(
            'Departamento Salvo com sucesso!!',
            'Ok', {duration: 2000});
            this.cancelar();
        },
        (err) => {
          console.error(err);
          this.snackBar.open(
            err.error.message, 'Ok', {duration: 2000});
        }
      )
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
