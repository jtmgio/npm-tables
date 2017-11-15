import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MCTableModule } from "./mc-table.module";
import { MCPaginatorModule } from "./mc-paginator/mc-paginator.module";
export * from "./itable.definition";
export * from "./mc-table.module";
export * from "./mc-paginator/mc-paginator";
export * from "./mc-paginator/client.datasource";
export * from "./mc-paginator/http.datasource";
export * from "./mc-paginator/icolumns.definition";
export * from "./mc-paginator/mc-paginator.module";
export * from "./mc-paginator/mc-paginator.intl";
export * from "./mc-table";
export * from "./mc-table-header";
export * from "./mc-paginator/mc-paginator.abstract";
export { MatSort, MatTable } from "@angular/material";

@NgModule({
	imports: [
	  CommonModule
	],
	declarations: [
	],
	exports: [
		MCTableModule,
		MCPaginatorModule,
		
	]
  })
  export class TableModule {
	static forRoot(): ModuleWithProviders {
	  return {
		ngModule: TableModule
	  };
	}
  }
  