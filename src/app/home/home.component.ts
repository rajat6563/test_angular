import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  fname: string;
  lname: string;
  contact: string;
  address: string;
  highedu: string;
  jobProfile: string;
  techSkills: string;
  doj: string;
  addEmpObj: any = { fname: '', lname: '', contact: '', address: '', highedu: '', jobProfile: '', techSkills: '', doj: '' };
  empDetailArray = [];
  selectedIndex: number = null;
  error: boolean;
  edit = false;

  constructor() { }

  ngOnInit() {
  }
  addEmpinfo() {
    console.log('inside addEmpinfo..............', this.addEmpObj);
    if (this.addEmpObj.fname === '' || this.addEmpObj.lname === ''
    || this.addEmpObj.contact === '' || this.addEmpObj.address === '' || this.addEmpObj.highedu === ''
    || this.addEmpObj.doj === '' || this.addEmpObj.techSkills === '')  {
      this.error = true;
      return;
    }
    this.empDetailArray.push(JSON.parse(JSON.stringify(this.addEmpObj)));
    console.log(this.empDetailArray);
    this.addEmpObj.fname = '';
    this.addEmpObj.lname = '';
    this.addEmpObj.contact = '';
    this.addEmpObj.address = '';
    this.addEmpObj.highedu = '';
    this.addEmpObj.doj = '';
    this.addEmpObj.techSkills = '';
    this.addEmpObj.jobProfile = '';
  }
  editEmpDetails(index) {
    console.log('inside editEmpDetails........', this.addEmpObj);
    console.log('edit index value.........', this.empDetailArray[index]);
    this.addEmpObj.fname = this.empDetailArray[index].fname;
    this.addEmpObj.lname = this.empDetailArray[index].lname;
    this.addEmpObj.contact = this.empDetailArray[index].contact;
    this.addEmpObj.address = this.empDetailArray[index].address;
    this.addEmpObj.highedu = this.empDetailArray[index].highedu;
    this.addEmpObj.jobProfile = this.empDetailArray[index].jobProfile;
    this.addEmpObj.techSkills = this.empDetailArray[index].techSkills;
    this.addEmpObj.doj = this.empDetailArray[index].doj;
    this.edit = true;
    this.selectedIndex = index;

  }
  editEmpNewDetails() {
    this.empDetailArray[this.selectedIndex].fname = this.addEmpObj.fname;
    this.empDetailArray[this.selectedIndex].lname = this.addEmpObj.lname;
    this.empDetailArray[this.selectedIndex].contact = this.addEmpObj.contact;
    this.empDetailArray[this.selectedIndex].address = this.addEmpObj.address;
    this.empDetailArray[this.selectedIndex].highedu = this.addEmpObj.highedu;
    this.empDetailArray[this.selectedIndex].jobProfile = this.addEmpObj.jobProfile;
    this.empDetailArray[this.selectedIndex].techSkills = this.addEmpObj.techSkills;
    this.empDetailArray[this.selectedIndex].doj = this.addEmpObj.doj;
    this.addEmpObj.fname = '';
    this.addEmpObj.lname = '';
    this.addEmpObj.contact = '';
    this.addEmpObj.address = '';
    this.addEmpObj.highedu = '';
    this.addEmpObj.jobProfile = '';
    this.addEmpObj.techSkills = '';
    this.addEmpObj.doj = '';
    this.edit = false;
  }
  delEmp(index) {
    console.log(index);
    this.empDetailArray.splice(index, 1);
  }
  serchEmp() {
    console.log('Hello', this.selectedIndex );
  }
}
