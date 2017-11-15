import { MatSort } from '@angular/material';
import { MCClientDataSource, MCHTTPDataSource, MCPaginator } from "./"
export interface iMCTable{
	columns: string[];
	dataSource: MCClientDataSource | MCHTTPDataSource | null;
	pageIndex: number;
	pageSize: number;
	pageSizeOptions: number[];	
	paginator: MCPaginator;
	sort: MatSort;
}