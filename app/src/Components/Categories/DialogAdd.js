import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
	PREFIX_ALERT as ALERT,
	PREFIX_CATEGORY_ADD as PREFIX,
	PREFIX_CATEGORIES as CATEGORIES,
} from "../../const/prefix";

import {
	Firebase
} from '../../Api'
const FormDialog = (state) => {
	const {
		isOpen,
		isLoad,
		name
	} = state.store;

	const {
		idMax,
		items: categories
	} = state.categories;

	const handleAdd = async () => {
		state.load();

		const categoriesNameList = Object.values(categories).map(c => c.toLowerCase().trim());

		try {
			if (!name.length)
				throw new Error(`Name is required`);

			if (categoriesNameList.includes(name.toLowerCase()))
				throw new Error(`Name must be unique`);

			await Firebase.setCollection(
				'categories',
				{
					...categories,
					[idMax+1] : name
				}
			);

			const updatedCategories = await Firebase.getCollection('categories');

			state.updateCategories(updatedCategories);

			state.close()

		} catch (e) {
			state.showError(e.message || e)
		} finally {
			state.loadStop();
		}
	};

	return (
		<div>
			<Dialog open={isOpen} onClose={state.close} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add category</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Category name"
						onChange={$ev => state.change($ev.target.value)}
						disabled={isLoad}
						value={name}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={state.close} disabled={isLoad} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAdd} disabled={isLoad} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default connect(
	state => ({
		store: state.CategoryAdd,
		categories: state.Categories
	}),
	dispatch => ({
		updateCategories : data => dispatch({type : `${CATEGORIES}Set`, data}),
		load             : () => dispatch({type : `${PREFIX}LoadRun`}),
		loadStop         : () => dispatch({type : `${PREFIX}LoadStop`}),
		close            : () => dispatch({type : `${PREFIX}Close`}),
		change           : data => dispatch({type : `${PREFIX}ChaneName`, data}),
		showError        : (message) => dispatch({type: `${ALERT}OpenError`, message}),
	})
)(FormDialog)
