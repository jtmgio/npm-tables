/*
**-------------------------------------------------------------------------------------
** CLASS NAME - IColumns Definition
** DESC - The Column definition must interface with our spec
**-------------------------------------------------------------------------------------
*/
export interface iColumns{
	name: string;
	canFilter: boolean;
	canSort: boolean;
	type: string;
	searchable: boolean;
}