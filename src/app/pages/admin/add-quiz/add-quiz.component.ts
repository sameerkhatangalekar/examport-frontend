import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  selectCategories : any = [];
  quizData : any = {
    title:'',
    description :'',
    maxMarks:'',
    numberOfQuestions:'',
    active: true,
    category:{
      cid: '',
    }
  };
  constructor(private _categoryService : CategoryService,private snack:MatSnackBar,private _quizService:QuizService) { }

  ngOnInit(): void {

    this._categoryService.getcategories().subscribe((data : any)=>{
      this.selectCategories = data;
    },(error)=>{
      console.error(error);
      Swal.fire('Error',"Error while loading categories!!",'error');
    })
  }

  public addQuiz(){
    if( this.quizData.description.trim()=='' || this.quizData.description==null || this.quizData.title.trim()=='' || this.quizData.title==null || this.quizData.category.cid=='' || this.quizData.category.cid==null || this.quizData.numberOfQuestions==null || this.quizData.description==null)
    {
      this.snack.open("All fields required!!!",'',{
        duration:2000
      });
      return;
    }
    this._quizService.addQuiz(this.quizData).subscribe((data)=>{
      Swal.fire('Success',"Quiz added successfully",'success');
      this.quizData = {
        title:'',
        description :'',
        maxMarks:'',
        numberOfQuestions:'',
        active: true,
        category:{
          cid: '',
        }
      };
    },(error)=>{
      Swal.fire('Error',"Error while adding quiz",'error');
    })

  }






}
