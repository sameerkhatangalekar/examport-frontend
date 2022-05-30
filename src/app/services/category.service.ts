import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //get multiple of categories
public getcategories(){

  return this.http.get(`${baseURL}/category/`);
}

//add single category
public addCategory(category: any)
{
  return this.http.post(`${baseURL}/category/`,category)
}

//get single category
public getCategory(cid:any)
{
  return this.http.get(`${baseURL}/category/${cid}`);
}

//update single category
public updateCategory(category:any)
{
  return this.http.put(`${baseURL}/category/`,category);
}
public deleteByCategoryId(categoryId: number)
{
  return this.http.delete(`${baseURL}/category/${categoryId}`);
}





}
