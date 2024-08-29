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
        formData.append('birth_date', authorData.birthDate ? authorData.birthDate.toISOString().split('T')[0] : '');
        formData.append('nationality', authorData.selectedCountry || '');
        formData.append('status', authorData.status);

        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }
        return this.http.post<any>(this.apiUrl, formData);
    }

}
