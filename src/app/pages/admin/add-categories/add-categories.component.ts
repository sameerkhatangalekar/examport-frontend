import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category ={
    title:'',
    description:''
  }
  constructor(private _category:CategoryService, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  addcategorySubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this.snack.open("Title Required",'',{
        duration:3000
      });
      return;
    }
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        console.log(data);
        this.category.title='';
        this.category.description='';
        Swal.fire("Success !!",'Category is added Successfully','success')
      },
      (error)=>
      {
        Swal.fire("Error !!","Server Error!!!",'error')
      }
    )
  }
}
