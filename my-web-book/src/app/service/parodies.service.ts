import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ParodiesService {
    private apiUrl = 'http://127.0.0.1:8000/api/parodies';

    constructor(private http: HttpClient) { }

    getAllParodies(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    addParodies(parodiesData: any): Observable<any> {
        const formData = new FormData();
        formData.append('name', parodiesData.name);
        formData.append('status', parodiesData.status);

        return this.http.post<any>(this.apiUrl, formData);
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    searchParodyByName(parodySearchName: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/name/${parodySearchName}`);
    }

    updateParodies(parodiesID: number, parodiesData: any): Observable<any> {
        const formData = new FormData();

        formData.append('name', parodiesData.name);
        formData.append('status', parodiesData.status);

        return this.http.put<any>(`${this.apiUrl}/${parodiesID}`, formData);
    }
}
