import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm){
    if (form)
    form.reset();
    this.employeeService.selectedEmployee = {
      _id : "",
      name : "",
      position : "",
      office : "",
      salary : null

    }        
  }

  onSubmit(form: NgForm){ 
    this.employeeService.postEmployee(form.value).subscribe((res) => {
      this.resetForm(form);
      M.toast({html : 'Saved successfully', classes: 'rounded'});
      this.refreshEmployeeList();

    });
  }

  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    })
  }

}
