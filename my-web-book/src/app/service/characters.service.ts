import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CharactersService {
    private apiUrl = 'http://127.0.0.1:8000/api/characters';

    constructor(private http: HttpClient) { }

    getAllCharacters(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    addCharacters(charactersData: any): Observable<any> {
        const formData = new FormData();
        formData.append('name', charactersData.name);
        formData.append('status', charactersData.status);

        return this.http.post<any>(this.apiUrl, formData);
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updadteCharacters(charactersID: number, charactersData: any): Observable<any> {
        const formData = new FormData();

        formData.append('name', charactersData.name);
        formData.append('status', charactersData.status);

        return this.http.put<any>(`${this.apiUrl}/${charactersID}`, formData);
    }
}
