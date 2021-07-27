import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface User {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  password: string;
  telefono: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost/impact_api/api/users';
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<[User]>(this.url);
  }

  getUser(id: number){
    return this.http.get<[User]>(this.url + '/' + id);
  }

  createUser(user: User){
    return this.http.post<[User]>(this.url, user);
  }

  updateUser(user: User, id: number){
    return this.http.put<[User]>(this.url + '/' + id, user);
  }

  deleteUser(id: number){
    return this.http.delete<[User]>(this.url + '/' + id);
  }

}
