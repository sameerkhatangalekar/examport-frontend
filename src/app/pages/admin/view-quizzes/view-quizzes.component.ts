import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzesData : any = [];

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.getQuizzes().subscribe(
      (data: any) => {
        this.quizzesData = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', "Error loading data" , 'error');
      }
    );
  }

  public deleteQuiz(quizId : number, quizTitle: any)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete "+quizTitle.toUpperCase()+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
             this._quiz.deleteQuiz(quizId).subscribe((data)=>{
              Swal.fire(
                'Deleted!',
                quizTitle+' has been deleted.',
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
