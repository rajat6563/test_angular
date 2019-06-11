import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
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
  empDetailArrayCopy = [];
  empDetailArrayForFilterSelect = [];
  selectedIndex: number = null;
  error: boolean;
  edit = false;
  searchInput: string = null;
  searchSelectionInput: string = null;
  selectedEmployeeFromDropdown = {};

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
    // this.empDetailArrayCopy.push(JSON.parse(JSON.stringify(this.addEmpObj)));
    console.log(this.empDetailArray);
    this.addEmpObj = {
      fname : '',
      lname: '' ,
      contact: '',
      address: '',
      highedu: '',
      doj: '',
      jobProfile: '',
      techSkills: ''
    };
    this.searchEmp('');
    // this.addEmpObj.fname = '';
    // this.addEmpObj.lname = '';
    // this.addEmpObj.contact = '';
    // this.addEmpObj.address = '';
    // this.addEmpObj.highedu = '';
    // this.addEmpObj.doj = '';
    // this.addEmpObj.techSkills = '';
    // this.addEmpObj.jobProfile = '';
    // this.empDetailArrayCopy = JSON.parse(JSON.stringify(this.empDetailArray));

  }
  editEmpDetails(index) {
    console.log('inside editEmpDetails........', this.addEmpObj);
    console.log('edit index value.........', this.empDetailArray[index]);
    this.addEmpObj = {
      fname : this.empDetailArrayCopy[index].fname,
      lname: this.empDetailArrayCopy[index].lname ,
      contact: this.empDetailArrayCopy[index].contact,
      address: this.empDetailArrayCopy[index].address,
      highedu: this.empDetailArrayCopy[index].highedu,
      doj: this.empDetailArrayCopy[index].doj,
      jobProfile: this.empDetailArrayCopy[index].jobProfile,
      techSkills: this.empDetailArrayCopy[index].techSkills
    };
    // this.addEmpObj.fname = this.empDetailArrayCopy[index].fname;
    // this.addEmpObj.lname = this.empDetailArrayCopy[index].lname;
    // this.addEmpObj.contact = this.empDetailArrayCopy[index].contact;
    // this.addEmpObj.address = this.empDetailArrayCopy[index].address;
    // this.addEmpObj.highedu = this.empDetailArrayCopy[index].highedu;
    // this.addEmpObj.jobProfile = this.empDetailArrayCopy[index].jobProfile;
    // this.addEmpObj.techSkills = this.empDetailArrayCopy[index].techSkills;
    // this.addEmpObj.doj = this.empDetailArrayCopy[index].doj;
    this.edit = true;
    this.selectedIndex = index;
    // this.empDetailArrayCopy = this.empDetailArray;

  }
  editEmpNewDetails() {
    this.empDetailArrayCopy[this.selectedIndex].fname = this.addEmpObj.fname;
    this.empDetailArrayCopy[this.selectedIndex].lname = this.addEmpObj.lname;
    this.empDetailArrayCopy[this.selectedIndex].contact = this.addEmpObj.contact;
    this.empDetailArrayCopy[this.selectedIndex].address = this.addEmpObj.address;
    this.empDetailArrayCopy[this.selectedIndex].highedu = this.addEmpObj.highedu;
    this.empDetailArrayCopy[this.selectedIndex].jobProfile = this.addEmpObj.jobProfile;
    this.empDetailArrayCopy[this.selectedIndex].techSkills = this.addEmpObj.techSkills;
    this.empDetailArrayCopy[this.selectedIndex].doj = this.addEmpObj.doj;
    this.addEmpObj.fname = '';
    this.addEmpObj.lname = '';
    this.addEmpObj.contact = '';
    this.addEmpObj.address = '';
    this.addEmpObj.highedu = '';
    this.addEmpObj.jobProfile = '';
    this.addEmpObj.techSkills = '';
    this.addEmpObj.doj = '';
    this.edit = false;
    // this.empDetailArrayCopy = this.empDetailArray;
  }
  delEmp(index) {
    console.log(index);
    this.empDetailArrayCopy.splice(index, 1);
  }
  searchEmp(type) {
    let searchInput = '';
    if (type === 'button') {
      searchInput = this.searchInput;
    }
    console.log('inside search emp function this.searchInput.....', this.searchInput);
    console.log('inside search emp function searchInput.....', searchInput);
    console.log('this.empDetailArray.....', this.empDetailArray);
    console.log('this.empDetailArray.....', this.empDetailArrayCopy);
    this.empDetailArrayCopy = this.empDetailArray.filter((element, i) => {
      console.log('inside filter function ', element);
      console.log('inside filter function index', i);
      if (element.fname === searchInput || searchInput === null || searchInput === '') {
        return true;
      }
    });
    console.log(this.empDetailArrayCopy);
  }
  searchEmp1() {
    console.log('inside seachEmp1 function', this.searchInput);
    this.empDetailArrayCopy = this.empDetailArray.filter((element, i) => {
      console.log('inside filter function ', element);
      console.log('inside filter function index', i);
      if (element.fname.indexOf(this.searchInput) !== -1) {
         return true;
      }
    });
  }
  searchSelection() {
    console.log('inside seachEmp1 function', this.searchSelectionInput);
    this.empDetailArrayForFilterSelect = this.empDetailArray.filter((element, i) => {
      console.log('inside filter function ', element);
      console.log('inside filter function index', i);
      if (element.fname.indexOf(this.searchSelectionInput) !== -1) {
         return true;
      }
    });
  }
  onSelectEmployee(empDetails) {
    console.log('on onSelectEmployee....', empDetails);
    this.searchSelectionInput = empDetails.fname;
    this.selectedEmployeeFromDropdown = empDetails;
    this.empDetailArrayForFilterSelect = [];
    // this.searchInput = empDetails.fname;
    // this.searchEmp1();
  }
}
