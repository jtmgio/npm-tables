import { Component, Input, Output, OnInit } from "@angular/core";
import { MatSort, MatTable } from '@angular/material';

@Component({
	selector: "mc-table-wrapper",
	template: `
		<ng-content select="[table-body]"></ng-content>
	`,
	styleUrls: [ './mc-table.scss' ],
	providers: []	
})

export class MCTable implements OnInit{ 

	constructor(){}

	ngOnInit(){
	}
}