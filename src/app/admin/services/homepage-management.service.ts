import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockAdminApiService } from '../../mock/mock-admin-api.service';
import { HomepageData } from '../interfaces/homepage-data.interface';

@Injectable({
  providedIn: 'root'
})
export class HomepageManagementService {

  constructor(
    private mockAdminApiService: MockAdminApiService,
  ) { }

  getHomepageData(): Observable<HomepageData> {
    return this.mockAdminApiService.getHomepageData();
  }

  updateHomepageData(formValue: any): Observable<HomepageData> {
    return this.mockAdminApiService.updateHomepageData(formValue);
  }
}
