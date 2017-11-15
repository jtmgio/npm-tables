import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MCPaginator } from './mc-paginator';
import { MCCustomPaginatorIntl } from './mc-paginator.intl';
import { MCClientDataSource } from './client.datasource';
import { MCHTTPDataSource } from './http.datasource';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatSelectModule,
		MatTooltipModule,
	],
	exports: [ MCPaginator ],
	declarations: [ MCPaginator ],
	providers: [ MCCustomPaginatorIntl ]
})
export class MCPaginatorModule {}