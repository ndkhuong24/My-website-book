import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GroupsService {
    private apiUrl = 'http://127.0.0.1:8000/api/groups';

    constructor(private http: HttpClient) { }

    getAllGroups(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    addGroups(groupsData: any): Observable<any> {
        const formData = new FormData();
        formData.append('name', groupsData.name);
        formData.append('status', groupsData.status);

        return this.http.post<any>(this.apiUrl, formData);
    }

    getById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    updateGroups(groupsID: number, groupsData: any): Observable<any> {
        const formData = new FormData();

        formData.append('name', groupsData.name);
        formData.append('status', groupsData.status);

        return this.http.put<any>(`${this.apiUrl}/${groupsID}`, formData);
    }
}
