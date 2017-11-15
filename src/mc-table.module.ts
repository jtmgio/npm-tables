import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { 
	MatPaginator, 
	MatSort, 
	MatTable,
	MatPaginatorIntl, 
	MatSelect, 
	MatTooltipModule, 
	MatButtonModule, 
	MatDialogModule, 
	MatTableModule, 
	MatPaginatorModule, 
	MatSelectModule,
	MatSortModule, 
	MatFormFieldModule,
	MatInputModule,
	
} from "@angular/material";

import { MCPaginatorModule } from "./mc-paginator/mc-paginator.module";
import { MCCustomPaginatorIntl } from "./mc-paginator/mc-paginator.intl";
import { MCPaginator } from "./mc-paginator/mc-paginator";
import { MCTable } from "./mc-table";
import { MCTableHeader } from "./mc-table-header";
@NgModule({
	declarations: [
		MCTable,
		MCTableHeader
	],
	imports: [
		MCPaginatorModule,
		MatTableModule,
		MatSelectModule,
		MatTooltipModule,
		MatFormFieldModule,
		MatInputModule,
		MatSortModule,
		MatButtonModule,
		CommonModule,
		FormsModule, ReactiveFormsModule 
			
	],
	exports: [
		MCPaginatorModule,
		MCPaginator,
		MCPaginatorModule,
		MatTableModule,
		MatSelectModule,
		MatTooltipModule,
		MatFormFieldModule,
		MatInputModule,
		MatSortModule,
		MatButtonModule,
		MCTable,
		MatSort,
		MatTable,
		MCTableHeader
	],
	providers: [{
		provide: MatPaginatorIntl, useClass: MCCustomPaginatorIntl
	}]
})
export class MCTableModule {}   
