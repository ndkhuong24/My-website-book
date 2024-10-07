import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ComicService {
    private apiUrl = 'http://127.0.0.1:8000/api/comic';

    constructor(private http: HttpClient) { }

    getAllComic(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    addComic(comicData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, comicData);
    }

    addComicDetail(comicDetail: any): Observable<any> {
        return this.http.post<any>(`http://127.0.0.1:8000/api/comic_detail`, comicDetail);
    }

    getDetailBtComicID(id: number): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:8000/api/comic/${id}/details/`);
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    // updateAuthor(id: number, authorDataCurrent: any, imageFile: File | null) {
    //     const formData = new FormData();
    //     formData.append('name', authorDataCurrent.name);
    //     formData.append('pen_name', authorDataCurrent.penName || '');
    //     formData.append('bio', authorDataCurrent.description || '');
    //     if (authorDataCurrent.birthDate) {
    //         const birthDate = new Date(authorDataCurrent.birthDate);
    //         const birthDateString = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${birthDate.getDate().toString().padStart(2, '0')}`;
    //         formData.append('birth_date', birthDateString);
    //     } else {
    //         formData.append('birth_date', '');
    //     }
    //     formData.append('nationality', authorDataCurrent.selectedCountry || '');
    //     formData.append('status', authorDataCurrent.status);

    //     if (imageFile) {
    //         formData.append('profile_picture', imageFile);
    //     }

    //     return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
    // }
}
