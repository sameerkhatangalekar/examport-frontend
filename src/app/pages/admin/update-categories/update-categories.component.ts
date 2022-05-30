import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrls: ['./update-categories.component.css']
})
export class UpdateCategoriesComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private categoryService: CategoryService, private route:Router) { }
  cId = 0;
  updateCategoryData:any;

  ngOnInit(): void {
    this.cId = this._route.snapshot.params['catId'];
    this.categoryService.getCategory(this.cId).subscribe((data)=>{
     this.updateCategoryData = data;
   },
   (error)=>{
    console.log(error);
   }

   )
  }
  public updatecategorySubmit()
  {
    this.categoryService.updateCategory(this.updateCategoryData).subscribe((data)=>{
      Swal.fire("Success !!",'Category updated Successfully','success').then((e)=>{
        this.route.navigate(['/admin/categories']);
      })

    },
    (error)=>{
      Swal.fire("Error !!",'Error while updating','error')
      console.log(error);
    });
  }

}
