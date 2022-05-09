import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor( private fb:FormBuilder,private api:ApiService) { }
  employeeData!:any;
  employeModelObj:EmployeeModel=new EmployeeModel();
  addModel:boolean;
  formValue!:FormGroup;
  ngOnInit(): void {
    this.formValue=this.fb.group({
      name:[''],
      password:[''],
    })
    this.getAllEmployee();
  }
  addaemployee(){
    this.addModel=true;
  }




  postEmployeeDetails(){
    this.employeModelObj.name=this.formValue.value.name;
    this.employeModelObj.password=this.formValue.value.password;

    this.api.postEmployee(this.employeModelObj).subscribe((res:any)=>{
      console.log(res);
      alert("employee added successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      
    },(err:any)=>{
      alert("somthing went wrong.............")
    })
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData=res;
    })
  }

  onEdit(row:any){
    this.employeModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['password'].setValue(row.password);
  }

  updateEmployeeDetails(){
    this.employeModelObj.name=this.formValue.value.name;
    this.employeModelObj.password=this.formValue.value.password;

    console.log(this.employeModelObj);
    this.api.updateEmployee(this.employeModelObj,this.employeModelObj.id)
    .subscribe((res:any)=>{
      console.log(res);
      alert("employee updated successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
      
    },(err:any)=>{
      console.log(err);
      alert("err")
      
    })
    
  }



  deleteEmployee1(id:any){
    this.api.deleteEmployee(id).subscribe(res=>{
      console.log(res);
      
      alert('Employee Deleted');
      this.getAllEmployee();
    },(err:any)=>{
      console.log(err);
      alert("err")
      
    })
  }
}
