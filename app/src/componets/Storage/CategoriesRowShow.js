import React from 'react';
import {connect} from 'react-redux';
import {del} from '../../api/Category'
import { TableRowColumn, TableRow } from 'material-ui/Table';
import ActionButtonDelete from '../tools/ActionButtonDelete'
import ActionButtonEdit from '../tools/ActionButtonEdit'
import AlertStatus from '../../const/AlertStatus'
import {StorageCategory, Alert, Confirm as ConfirmAction} from '../../const/Events'
import {Confirm, CategoryError} from '../../const/Messages'

const CategoriesRowShow = (state) => {

	const onDelete = id => {
		state.confirm(id, ()=> new Promise((ok, bad) => {
			del(id)
				.then(() => ok(true))
				.catch(e => {
					state.showAlert(CategoryError.move, AlertStatus.BAD);
					bad();
				});
		}));
	};

	return (
		<TableRow >
			<TableRowColumn style={{overflow: 'visible'}}>
				<ActionButtonDelete id={state.id} onTouch={onDelete}/>
				<ActionButtonEdit id={state.id} onTouch={state.onEdit}/>
				{state.name}
			</TableRowColumn>
		</TableRow>
	);
};

export default connect(
	state => ({
		store      : state.storage,
		categories : state.storageCategories
	}),
	dispatch => ({
		onEdit  : id => dispatch({type : StorageCategory.editMode , data : id}),
		confirm : (id, backPromise) => dispatch({
			type : ConfirmAction.show,
			data : {
				actionCancel       : StorageCategory.moveCancel,
				actionConfirm      : StorageCategory.move,
				question           : Confirm.question,
				dataConfirm        : id,
				callPromiseConfirm : backPromise
			}
		}),
		showAlert : (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(CategoriesRowShow);
