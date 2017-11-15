/*
**-------------------------------------------------------------------------------------
** CLASS NAME - AbstractTableService
** DESC - Any component wanting to use the the client pager MUST follow the spec laid in this abstract class
** the service used to get the data will need to implement this abstract class
**-------------------------------------------------------------------------------------
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export abstract class AbstractTableService {
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getList
	**-------------------------------------------------------------------------------------
	*/
	public getList: ( page?: number, sort?: string, order?: string, search?: string ) => Observable<any>;
} 