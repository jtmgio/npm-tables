import { Component, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';


@Component({
	selector: "mc-paginator",
	styleUrls: [ "mc-paginator.scss" ],
	template: `
		<div class="mat-paginator-container">
			<div class="mat-paginator-page-size _25">
				<mat-form-field class="mat-paginator-page-size-select">
					<mat-select
						class="mat-paginator-page-size-form-control"
						[value]="pageSize"
						[aria-label]="intlData.itemsPerPageLabel"
						(change)="changePageSize($event.value)">
						<mat-option *ngFor="let pageSizeOption of _displayedPageSizeOptions" [value]="pageSizeOption">
							{{pageSizeOption}}
						</mat-option>
					</mat-select>
				</mat-form-field>
				per page
			</div>		 
			<div class="mat-paginator-offset _55"></div>
			<div class="mat-paginator-range-actions _20">
				page 
				<mat-form-field  class="mat-paginator-page-size-select">
					<mat-select
						class="mat-paginator-page-size-form-control"
						[value]="currentPage"
						[aria-label]="intlData.itemsPerPageLabel"
						(change)="changePage($event.value)">
						<mat-option *ngFor="let page of getPages()" [value]="page">
							{{ page  + 1 }}
						</mat-option>
					</mat-select>
				</mat-form-field>
				of <strong>{{ roundPage( length /pageSize ) }}</strong>
				<button type="button"
					class="mat-paginator-navigation-previous"
					(click)="mcPrevPage()"
					[attr.aria-label]="_intl.previousPageLabel"
					[matTooltip]="intlData.previousPageLabel"
					[matTooltipPosition]="'above'"
					[disabled]="!hasPreviousPage()">
					<div class="mat-paginator-increment"></div>
				</button><button type="button"
					class="mat-paginator-navigation-next"
					(click)="mcNextPage()"
					[attr.aria-label]="_intl.nextPageLabel"
					[matTooltip]="intlData.nextPageLabel"
					[matTooltipPosition]="'above'"
					[disabled]="!hasNextPage()">
					<div class="mat-paginator-decrement"></div>
				</button>
			</div>			
		</div>
	`
})
export class MCPaginator extends MatPaginator{
	//keep track of the current page
	protected currentPage: number = 0;
	protected intlData = this._intl
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(public intl: MatPaginatorIntl, private changeDetectorRef: ChangeDetectorRef){
		super( intl, changeDetectorRef );
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getPages
	**-------------------------------------------------------------------------------------
	*/
	getPages(){
		//build page array off length of list
		return Array.from( Array( Math.round( this.length / this.pageSize ) ).keys() );
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - changePage
	**-------------------------------------------------------------------------------------
	*/
	changePage( page:number ){
		this.pageIndex = page - 1;
		this.nextPage();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - changePageSize
	**-------------------------------------------------------------------------------------
	*/
	changePageSize( value:number ){
		this._changePageSize( value );
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - roundPage
	**-------------------------------------------------------------------------------------
	*/
	roundPage( page: number ){
		return Math.round( page );
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - mcNextPage
	**-------------------------------------------------------------------------------------
	*/
	mcNextPage(){
		this.currentPage = this.pageIndex + 1;
		this.nextPage();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - mcPrevPage
	**-------------------------------------------------------------------------------------
	*/
	mcPrevPage(){
		this.currentPage = this.pageIndex - 1;
		this.previousPage();
	}
}
