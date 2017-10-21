import React from 'react';
import {connect} from 'react-redux';
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonSave from '../tools/ActionButtonSave'
import ActionButtonCancel from '../tools/ActionButtonCancel'
import TextField from 'material-ui/TextField';
import {edit} from '../../api/Category'
import AlertStatus from '../../const/AlertStatus'
import {StorageCategory, Alert} from '../../const/Events'

const CategoriesRowEdit = (state) => {
	const store = state.store;

	const saveEdit = () => {
		edit(state.id, store.editName)
			.then(
				r => state.onSaveEdit(state.id),
				e => state.showAlert(e, AlertStatus.BAD)
			);
	};

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonCancel onTouch={state.onCancel}/>
				<ActionButtonSave onTouch={saveEdit}/>
				<TextField value={store.editName} id={state.id} onChange={state.onEditCategory}/>
			</TableRowColumn>
		</TableRow>
	);
};

export default connect(
	state => ({
		store: state.storageCategories,
	}),
	dispatch => ({
		onCancel       : ()    => dispatch({type : StorageCategory.editCancel}),
		onSaveEdit     : ()    => dispatch({type : StorageCategory.editSave}),
		onEditCategory : event => dispatch({type : StorageCategory.edit, data: event.target.value}),
		showAlert      : (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		}),
	})
)(CategoriesRowEdit);
