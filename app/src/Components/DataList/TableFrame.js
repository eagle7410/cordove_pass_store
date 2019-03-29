import React from 'react';
import {connect} from 'react-redux';
// My cmp
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import RowAction from "./TableRowAction";

import {classes} from "../../const/styles";
import Tools from './TableTools'
import Head from './TableHead'
import Filters from './TableFilters'
import {PREFIX_STORE as PREFIX} from "../../const/prefix";

const TableFrame = (state) => {
	const {classes} = state;
	const {
		items,
		page,
		rowsPerPage,
		selected,
		isShowFilters,
		order,
		orderBy
	} = state.store;

	const {
		category,
		titleLogin,
		answer,
		description,
	} = state.filters;

	const {items: categories} = state.data;

	let rows = [].concat(items).filter(row => !(
		(category > 0 && row.category !== category) ||
		!(row.title + row.login).toLowerCase().includes(titleLogin.toLowerCase()) ||
		!row.answer.includes(answer) ||
		!row.desc.includes(description)
	));

	const handleChangeRowsPerPage = (event) => state.rowsOnPage(event.target.value);
	const handleChangePage = (event, page) => state.page(page);

	const filters = isShowFilters ? <Filters/> : null;

	return (
		<div>
			<Tools/>
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableTitle">
					<Head/>
					<TableBody>
						{filters}
						{stableSort(rows, getSorting(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(row => {
								const isSelect = selected.includes(row.id);

								return (
									<TableRow
										hover
										aria-checked={isSelect}
										tabIndex={-1}
										key={`cat${row.id}`}
										selected={isSelect}
									>
										<TableCell component="td" scope="row">
											<RowAction row={row} />
										</TableCell>
										<TableCell component="td" scope="row">
											{row.title}<br/>
											{row.login}
										</TableCell>
										<TableCell component="td" scope="row">
											{row.isShowPassword ? row.pass : '*'.repeat(row.pass.length)}
										</TableCell>
										<TableCell component="td" scope="row">
											{categories[row.category] || 'Category not found'}
										</TableCell>
										<TableCell component="td" scope="row">
											{row.answer}
										</TableCell>
										<TableCell component="td" scope="row">
											{row.desc.split('\n').map((element, inx) => (<div key={`elem${row.id + inx}`}>{element}</div>))}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page',
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
};

export default connect(
	state => ({
		store: state.Store,
		filters: state.StoreFilters,
		data: state.Categories
	}),
	dispatch => ({
		page: data => dispatch({type: `${PREFIX}SetPage`, data}),
		rowsOnPage: data => dispatch({type: `${PREFIX}SetRowsOnPage`, data})
	})
)(withStyles(classes)(TableFrame));

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc'
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}
