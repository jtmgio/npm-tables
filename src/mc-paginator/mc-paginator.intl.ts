import { MatPaginatorIntl } from '@angular/material';

export class MCCustomPaginatorIntl extends MatPaginatorIntl{
	constructor(){
		super();
		this.itemsPerPageLabel = "per page";
	}
}
