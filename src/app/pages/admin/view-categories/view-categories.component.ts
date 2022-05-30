import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories : any = [];
  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.getcategories().subscribe((data:any)=>{
      this.categories = data;
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error","Error in loading data","error");
    }
    );
  }
  deleteByCatId(categoryId : number, categoryTitle : string)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete "+categoryTitle.toUpperCase()+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
              this._category.deleteByCategoryId(categoryId).subscribe((data)=>{
              Swal.fire(
                'Deleted!',
                categoryTitle+' has been deleted.',
                'success'
              );
              this.ngOnInit();
        },(error)=>{
          console.log(error);
        })

      }
    })
  }










}
