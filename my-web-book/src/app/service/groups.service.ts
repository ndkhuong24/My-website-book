import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Groups } from '../models/Groups.model';
import { ResponseMessage } from '../models/response.model';
import { GroupCreateUpdateData } from '../models/Groups-create-update.model';

@Injectable({
    providedIn: 'root'
})
export class GroupsService {
    private apiUrl = 'http://127.0.0.1:8000/api/groups';

    constructor(private http: HttpClient) { }

    // Lấy tất cả các nhóm
    getAllGroups(): Observable<Groups[]> {
        return this.http.get<Groups[]>(this.apiUrl);
    }

    // Xóa nhóm theo ID, phản hồi một thông báo
    deleteById(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    // Thêm mới một nhóm
    addGroups(groupsData: GroupCreateUpdateData): Observable<any> {
        return this.http.post<any>(this.apiUrl, groupsData);
    }

    // Lấy thông tin nhóm theo ID
    getById(id: number): Observable<Groups> {
        return this.http.get<Groups>(`${this.apiUrl}/${id}`);
    }

    // Cập nhật thông tin nhóm
    updateGroups(groupsID: number, groupData: GroupCreateUpdateData): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${groupsID}`, groupData);
    }
}
