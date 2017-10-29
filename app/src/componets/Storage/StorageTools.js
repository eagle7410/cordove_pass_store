import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionTools from 'material-ui/svg-icons/action/reorder';
import Drawer from 'material-ui/Drawer';
import StorageCategoriesList from './StorageCategoriesList'
import {StorageFilters, Storage} from '../../const/Events'
import RaisedButton from 'material-ui/RaisedButton';

const StoreTools = (state) => {
	let filters = state.filters;
	const changeCountInPage = (ev, val) => {
		state.changeCountInPage(val);
	}

	return (
		<div>
			<Toolbar>
				<ToolbarGroup >
					<IconButton tooltip="Open tools"
					            disabled={filters.isOpenTools}
					            onTouchTap={state.toolsOpen}
					>
						<ActionTools/>
					</IconButton>
					<IconButton
						tooltip='Search'
						touch={true}
						tooltipPosition='bottom-right'
					>
						<ActionSearch
							hoverColor={filters.searchIcoActive}
							color={filters.searchIcoNow}
							onTouchTap={state.changeShowSearchText}
						/>
					</IconButton>
					{
						filters.showSearchText
							? <TextField id='inputSearch' hintText='Enter for search' style={{maxWidth : 200}} onChange ={state.changeSearchText}/>
							: <span/>
					}
					<ToolbarSeparator />
				</ToolbarGroup>
			</Toolbar>
			<Drawer
				open={filters.isOpenTools}
			>
				<RaisedButton
					label={'Close tools'}
					secondary={true}
					onTouchTap={state.toolsClose}
					style={{marginRight : 20}}
				/>
				<br/>Count in page&nbsp;
				<TextField onChange={changeCountInPage} value={state.pagination.split} id='inputPagi' hintText='Enter count record in page' />
				<StorageCategoriesList onEdit={state.changeCategory} showAll={true} val={filters.categorySelect} />
			</Drawer>
		</div>

	);
};

export default connect(
	state => ({
		filters : state.storageFilters,
		pagination : state.storagePagination
	}),
	dispatch => ({
		toolsClose      :  ev => dispatch({type : StorageFilters.toolsClose}),
		toolsOpen       :  ev => dispatch({type : StorageFilters.toolsOpen}),
		changeCountInPage : val => dispatch({type : Storage.changeCountInPage, data : val}),
		changeCategory       : (event, index, value) => dispatch({type: StorageFilters.chCat, data: value}),
		changeSearchText     : (ev, val) => dispatch({type: StorageFilters.chText, data: val.toLowerCase()}),
		changeShowSearchText : ev => dispatch({type: StorageFilters.toggleText, data: ev.target.value})
	})
)(StoreTools);
