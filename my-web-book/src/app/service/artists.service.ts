import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArtistsService {
    private apiUrl = 'http://127.0.0.1:8000/api/artists';

    constructor(private http: HttpClient) { }

    getAllArtists(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    addArtists(artistsData: any): Observable<any> {
        const formData = new FormData();
        formData.append('name', artistsData.name);
        formData.append('status', artistsData.status);

        return this.http.post<any>(this.apiUrl, formData);
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateArtists(artistsID: number, artistsData: any): Observable<any> {
        const formData = new FormData();

        formData.append('name', artistsData.name);
        formData.append('status', artistsData.status);

        return this.http.put<any>(`${this.apiUrl}/${artistsID}`, formData);
    }
}
