import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


interface People{
  name: string;
  location: string;
}

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  constructor(private dataServcie: DataService) { }
  listOfPeople: People[]=[];
  showPeopleList: People[]=[];
  title='PEOPLE DATA';
  showAlertMessage= false;
  footerText='CURRENTLY 3 PEOPLE SHOWING';
  counter=1;
  alertMessage= 'No more people!';
  indexValue=0;
  
  ngOnInit(): void {
    this.getAllDataFromService();
  }

  getAllDataFromService(){
    this.dataServcie.getPeopleData().subscribe(data=>{
      this.listOfPeople = JSON.parse(JSON.stringify(data));
      this.addDataToList();
    });
  }

  addDataToList(){
    for(let i=0;i<3;i++){
      this.showPeopleList.push(this.listOfPeople[i]);
    }
  }
  
  displayNextPersonsDetails(){
       let newLength = this.showPeopleList.length + 3*this.counter;
    if (newLength > this.listOfPeople.length) {
        newLength = this.listOfPeople.length
        this.showAlertMessage = true;
        setTimeout(() => {
          this.showAlertMessage =false;
        }, 500000);
    }   else{
      this.indexValue=  this.indexValue+3;
    }  
     this.showPeopleList = this.listOfPeople.slice(newLength-3, newLength);
     this.counter++;
  }

}
