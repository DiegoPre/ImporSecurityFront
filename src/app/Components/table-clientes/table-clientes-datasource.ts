import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableClientesItem {
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableClientesItem[] = [
  {id: 1, name: 'Policía Nacional'},
  {id: 2, name: 'Ministerio de Defensa'},
  {id: 3, name: 'Fuerza Aérea'},
  {id: 4, name: 'Armada de Colombia'},
  {id: 5, name: 'Inpec'},
  {id: 6, name: 'Fiscalía General de la Nación'},
  {id: 7, name: 'Alcaldías'},
  {id: 8, name: 'Gobernaciones'},
  {id: 9, name: 'Hospitales'},
  {id: 10, name: 'Clínicas'},
  {id: 11, name: 'Cuerpos de Bomberos'},
  {id: 12, name: 'Defensa Civil'},
  {id: 13, name: 'Empressas Carroceras'},
  {id: 14, name: 'Empresas de Aseo'},
  {id: 15, name: 'Concesiones Viáles'},
  {id: 17, name: 'Concesionarios'},
  {id: 18, name: 'Blindadoras'},
  {id: 19, name: 'Aseguradoras'},
  {id: 20, name: 'Direcciones de Tránsito'},
];

/**
 * Data source for the TableClientes view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableClientesDataSource extends DataSource<TableClientesItem> {
  data: TableClientesItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  
  connect(): Observable<TableClientesItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableClientesItem[]): TableClientesItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableClientesItem[]): TableClientesItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
