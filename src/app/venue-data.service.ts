import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenueDataService {
  private totalVenuesData: any[] = [];
  dataChanged = new EventEmitter<any[]>();

  setTotalVenuesData(data: any[]) {
    this.totalVenuesData = data;
    this.dataChanged.emit(data);
  }

  getTotalVenuesData() {
    return this.totalVenuesData;
  }
}
