import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperService {

  private baseUrl = environment.apiUrl; // 🔹 Change this to your actual API URL
 
   constructor(private http: HttpClient) { }

   getCompanies() {
  return this.http.get(`${this.baseUrl}/ControlPanel/companies`);
}
}
