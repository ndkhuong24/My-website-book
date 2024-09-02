import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TagsService {
    private apiUrl = 'http://127.0.0.1:8000/api/tags';

    constructor(private http: HttpClient) { }

    getAllTags(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    // addCategory(categoryData: any): Observable<any> {
    //     const formData = new FormData();
    //     formData.append('name', categoryData.name);
    //     formData.append('status', categoryData.status);

    //     return this.http.post<any>(this.apiUrl, formData);
    // }

    // getById(id: any): Observable<any> {
    //     return this.http.get<any>(`${this.apiUrl}/${id}`);
    // }

    // updateCategory(categoryId: number, categoryData: any): Observable<any> {
    //     const formData = new FormData();

    //     formData.append('name', categoryData.name);
    //     formData.append('status', categoryData.status);

    //     return this.http.put<any>(`${this.apiUrl}/${categoryId}`, formData);
    // }
}
