import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguagesService {
    private apiUrl = 'http://127.0.0.1:8000/api/languages';

    constructor(private http: HttpClient) { }

    getAllTags(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    addLanguages(languagesData: any): Observable<any> {
        const formData = new FormData();
        formData.append('name', languagesData.name);
        formData.append('status', languagesData.status);

        return this.http.post<any>(this.apiUrl, formData);
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateLanguages(languagesID: number, languagesData: any): Observable<any> {
        const formData = new FormData();

        formData.append('name', languagesData.name);
        formData.append('status', languagesData.status);

        return this.http.put<any>(`${this.apiUrl}/${languagesID}`, formData);
    }
}
