
import React from 'react';
import {connect} from 'react-redux';

// My cmp
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteIcon from '@material-ui/icons/Delete';

import {classes} from "../../const/styles";
import Tools from './TableTools'
import {
	PREFIX_CATEGORIES as PREFIX,
} from "../../const/prefix";

const TableFrame = (state) => {
	const {classes} = state;
	const {
		items,
		page,
		rowsPerPage,
		selected,
		order,
		orderBy
	} = state.store;
	const {items:data} = state.data;
	let counters = {};

	data.map(d => {
		if (!counters[d.category]) counters[d.category] = 0;
		counters[d.category]++;

	});

	let rows = [].concat(Object.entries(items).map(([id, name]) => ({id:  Number(id), name})));

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangeRowsPerPage = (event) => state.rowsOnPage(event.target.value);
	const handleChangePage = (event, page) => state.page(page);
	const handleCategoryDelete = ($ev, category) => {
		$ev.preventDefault();
		console.log('delete category', category);
	};

	return (
		<div>
			<Tools  />
			<div className={classes.tableWrapper}>
				<Table className={classes.table} aria-labelledby="tableTitle">
					<TableBody>
						{stableSort(rows, getSorting(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const counter = counters[n.id] || 0;
								const isSelect = selected.includes(n.id);

								return (
									<TableRow
										hover
										role="checkbox"
										aria-checked={isSelect}
										tabIndex={-1}
										key={`cat${n.id}`}
										selected={isSelect}
									>
										<TableCell component="th" scope="row">
											<Button disabled={counter > 0}
											        onClick={($ev) => handleCategoryDelete($ev, n)}
											>
												<DeleteIcon key={`icoDel${n.id}`}/>
											</Button>
											{n.name} ({counter})
										</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 49 * emptyRows }} key={'catEmpty'} />
						)}
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
		store: state.Categories,
		data: state.Store
	}),
	dispatch => ({
		page: data => dispatch({type: `${PREFIX}SetPage`, data}),
		rowsOnPage: data => dispatch({type: `${PREFIX}SetRowsOnPage`, data}),
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
