import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort } from '@angular/material';
import { AbstractTableService } from "./mc-paginator.abstract";
import { iColumns } from "./icolumns.definition";
import { iHTTPData } from "./ihttpdata.definition";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';

export class MCHTTPDataSource extends DataSource<any>{
	private resultsLength = 0;
	private filterChange = new BehaviorSubject( '' );
	private isLoading: boolean = false;
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - contructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		private service: AbstractTableService,	//Must be of type AbstractTableService
		private paginator: MatPaginator,	//we pass reference to the paginator
		private sort: MatSort,	//pass reference to the MatSor
		private columns: iColumns[]	//Column definitions
	){
		//we have to call super() per NG
		super();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getFilter
	**-------------------------------------------------------------------------------------
	*/
	get filter(): string { 
		return this.filterChange.value; 
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setFilter
	**-------------------------------------------------------------------------------------
	*/
	set filter( filter: string ) { 
		this.filterChange.next( filter ); 
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - connect
	**-------------------------------------------------------------------------------------
	*/
	connect(): Observable<any[]>{
		//page and sort change events
		const displayDataChanges = [
			this.paginator.page,
			this.sort.sortChange,
			this.filterChange
		];
		//if sorting is done go to page 1
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0) ;
		//merge in event streams
		return Observable.merge(...displayDataChanges)
			//Emit given value first
			//https://www.learnrxjs.io/operators/combination/startwith.html
			.startWith( null )
			//Map to observable, complete previous inner observable, emit values
			//https://www.learnrxjs.io/operators/transformation/switchmap.html
			.switchMap( () => {
				this.isLoading = true;
				return this.service.getList( ( this.paginator.pageIndex + 1 ), this.sort.active, this.sort.direction, this.filter );
			})
			.map( ( data: iHTTPData )  => {
				this.isLoading = false;
				this.resultsLength = data.count;
				return data.list;
			})
			.catch(() => {
				this.isLoading = false;
				return Observable.of([]);
			});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - disconnect
	**-------------------------------------------------------------------------------------
	*/
	disconnect(){}
	
}
