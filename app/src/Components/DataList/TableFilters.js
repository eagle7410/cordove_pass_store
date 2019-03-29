import React from 'react';
import {connect} from 'react-redux';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import {
	PREFIX_STORE_FILTERS as PREFIX
} from '../../const/prefix'
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const TableFilters = (state) => {
	const {
		category,
		titleLogin,
		answer,
		description
	} = state.store;

	const {items} = state.categories;

	return (
		<TableRow>
			<TableCell component="td" scope="row" />
			<TableCell component="td" scope="row">
				<TextField value={titleLogin} onChange={$ev => state.onChange('titleLogin', $ev.target.value)}/>
			</TableCell>
			<TableCell component="td" scope="row" />
			<TableCell component="td" scope="row">
				<Select
					value={category}
					onChange={$ev => state.onChange('category', $ev.target.value)}
				>
					<MenuItem value={-1}>
						<em>All categories</em>
					</MenuItem>
					{Object.entries(items).map(([id, name], inx) => (
						<MenuItem value={Number(id)} key={`catFilter${inx}`}>{name}</MenuItem>
					))}
				</Select>
			</TableCell>
			<TableCell component="td" scope="row">
				<TextField value={answer} onChange={$ev => state.onChange('answer', $ev.target.value)}/>
			</TableCell>
			<TableCell component="td" scope="row">
				<TextField value={description} onChange={$ev => state.onChange('description', $ev.target.value)}/>
			</TableCell>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.StoreFilters,
		categories: state.Categories
	}),
	dispatch => ({
		onChange : (field, value) => dispatch({type : `${PREFIX}Change`, data: {field, value}}),
	})
)(TableFilters);
