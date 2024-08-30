import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {
    private apiUrl = 'http://127.0.0.1:8000/api/authors';

    constructor(private http: HttpClient) { }

    getAllAuthor(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    addAuthor(authorData: any, profilePicture: File | null): Observable<any> {
        const formData = new FormData();
        formData.append('name', authorData.name);
        formData.append('pen_name', authorData.penName || '');
        formData.append('bio', authorData.description || '');
        if (authorData.birthDate) {
            const birthDate = new Date(authorData.birthDate);
            const birthDateString = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${birthDate.getDate().toString().padStart(2, '0')}`;
            formData.append('birth_date', birthDateString);
        } else {
            formData.append('birth_date', '');
        }
        formData.append('nationality', authorData.selectedCountry || '');
        formData.append('status', authorData.status);

        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }

        return this.http.post<any>(this.apiUrl, formData);
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateAuthor(id: number, authorDataCurrent: any, imageFile: File | null) {
        const formData = new FormData();
        formData.append('name', authorDataCurrent.name);
        formData.append('pen_name', authorDataCurrent.penName || '');
        formData.append('bio', authorDataCurrent.description || '');
        if (authorDataCurrent.birthDate) {
            const birthDate = new Date(authorDataCurrent.birthDate);
            const birthDateString = `${birthDate.getFullYear()}-${(birthDate.getMonth() + 1).toString().padStart(2, '0')}-${birthDate.getDate().toString().padStart(2, '0')}`;
            formData.append('birth_date', birthDateString);
        } else {
            formData.append('birth_date', '');
        }
        formData.append('nationality', authorDataCurrent.selectedCountry || '');
        formData.append('status', authorDataCurrent.status);

        if (imageFile) {
            formData.append('profile_picture', imageFile);
        }

        return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
    }
}
