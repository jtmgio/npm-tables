import { Component, OnInit, Input, Output, EventEmitter,  ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

const debounceTime = 150;

@Component({
	selector: "mc-table-header",
	template: `
		<mat-card-header>
			<ng-content select="[table-header]"></ng-content>
			<div class="header-field-container" *ngIf="showFilter">
				<input type="text" [formControl]="filter" placeholder="">
				<button class="mc-raised-button" (click)="search()" mat-raised-button color="mc-green">Search</button>		
			</div>	
		</mat-card-header>
	`,
	styleUrls: [ './mc-table-header.scss' ],
	providers: []	
})

export class MCTableHeader implements OnInit{ 
	private showFilter: boolean = false;
	private filter: FormControl; 
	private instantFilter: boolean = false;
	
	//output event for when we filter
	//should bubble to extending component
	@Output() onChildFilterEvent: EventEmitter<string> = new EventEmitter<string>();

	//set/get hasFilter
	@Input()
	set hasFilter( show: boolean ){
		this.showFilter = show;
	}
	get hasFilter(): boolean{
		return this.showFilter;
	}
	//set/get filterOnKeyUp
	@Input()
	set filterOnKeyUp( doFilter: boolean ){
		this.instantFilter = doFilter;
	}
	get filterOnKeyUp(): boolean{
		return this.instantFilter;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/	
	constructor(){}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ngOnInit
	**-------------------------------------------------------------------------------------
	*/	
	ngOnInit(): void{
		this.filter = new FormControl();
		if( this.instantFilter ){
			this.filter.valueChanges.debounceTime( debounceTime ).distinctUntilChanged().subscribe(()=>{
				this.onChildFilterEvent.emit( this.filter.value );
			})	
		}
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - search
	**-------------------------------------------------------------------------------------
	*/	
	search(): void{
		this.onChildFilterEvent.emit( this.filter.value );
	}
}