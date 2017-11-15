import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatPaginator, MatSort } from '@angular/material';
import { AbstractTableService } from "./mc-paginator.abstract";
import { iColumns } from "./iColumns.definition";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/merge';

export class MCClientDataSource extends DataSource<any>{
	private resultsLength = 0;
	private filterChange = new BehaviorSubject( '' );
	private searchableKeys: string[] = [];
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
		columns.forEach( ( item )=>{
			if( item.searchable ) this.searchableKeys.push( item.name );
		});
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
		return Observable.merge( ...displayDataChanges )
			//Emit given value first
			//https://www.learnrxjs.io/operators/combination/startwith.html
			.startWith( null )
			//Map to observable, complete previous inner observable, emit values
			//https://www.learnrxjs.io/operators/transformation/switchmap.html
			.switchMap( ()=>{
				//get my data from our server
				//TODO Implment interface to enforce GETLIST on DI service
				return this.service.getList();
			})
			.map( ( data: any[] ) => {
				//figure out the page based pagesize/pageindex
				const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
								
				//the full count
				this.resultsLength = data.length;
				
				//slice data to conform to page options
				//if we arent sorting do nothing in reg ards to sorting
				if( !this.sort.active || this.sort.direction == "" ){	
					
					//lets filter the list down first
					let list = data.filter( item => {
						return this.filterList( item );
					});
					//get the end results total of the filter
					this.resultsLength = list.length;
					//return the sliced list
					return this.sliceList( list, startIndex );
				}
				//lets start the sorting				
				//sort by name
				let sort = data.filter( item => {
					return this.filterList( item );
				});
				

				//Holds all of the sub comparator functions
				const subComparators = { 
					string : (a, b) => {
						return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
					}, 
					number : (a, b) => {
						return a - b;
					}, 
					date: (a, b) => {
						const result = new Date(a).valueOf() - new Date(b).valueOf();
						return result || 0;
					}
				};

				//Main comparator that does error checking and chooses the subComparator and picks out the data to compare
				const comparator = ( a, b ) => {
					
					const { active, direction } = this.sort;
					const columnData = this.columns.find( (item) => item.name === active );

					if (!columnData || !columnData.canSort || !subComparators[columnData.type]) { //add all condtions to break out of the sort comparison here
						return 0;
					}

					const item1 = a[active];
					const item2 = b[active];

					const result = subComparators[columnData.type](item1, item2) || 0;
					
					return direction === "desc" ? result * -1 : result; //multiplying by -1 flips the direction
				};

				sort = sort.sort( comparator );

				this.resultsLength = sort.length;

				//return sorted
				return this.sliceList( sort, startIndex );
			})
			.catch(() => {
				return Observable.of([]);
			});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sliceList
	**-------------------------------------------------------------------------------------
	*/
	sliceList( data: any[], startIndex: number ){
		return data.slice( startIndex, startIndex + this.paginator.pageSize );
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sliceList
	**-------------------------------------------------------------------------------------
	*/
	filterList( item ){
		let flag;
		for( let prop in item ){
			flag = false;
			if( this.searchableKeys.indexOf( prop ) > -1 ){
				flag = item[ prop ].toString().indexOf( this.filter ) != -1;
				if( flag ) break;
			}
		}
		return flag;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - disconnect
	**-------------------------------------------------------------------------------------
	*/
	disconnect(){}
	
}
