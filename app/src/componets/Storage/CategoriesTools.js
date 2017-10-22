import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {add} from '../../api/Category'
import AlertStatus from '../../const/AlertStatus'
import {Alert} from '../../const/Messages'
import {StorageCategory, Alert as AlertAction} from '../../const/Events'
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';

const CategoriesTools = (state) => {
	let store = state.store;

	const handelSave = () => {
		const val = store.addName;

		if (!val) {
			return state.showAlert(Alert.empty, AlertStatus.BAD);
		}

		add(val)
			.then(data => {
				state.save(data);
				state.toolsOpen();
				state.showAlert(Alert.save, AlertStatus.OK);
			})
			.catch(err => state.showAlert(err, AlertStatus.BAD));
	};

	return (
		<div>
			<Toolbar>
				<ToolbarGroup >
					<IconButton tooltip="Open adding tools"
					            disabled={state.store.isOpenAddingTools}
					            onTouchTap={state.toolsOpen}
					>
						<ActionAdd/>
					</IconButton>
					<ToolbarTitle text="Tools"/>
				</ToolbarGroup>
			</Toolbar>
			<Drawer
				open={state.store.isOpenAddingTools}
			>
				<RaisedButton
					label={'Close tools'}
					secondary={true}
					onTouchTap={state.toolsClose}
					style={{marginRight : 20}}
				/>
				<TextField
					hintText={'Enter category'}
					value={store.addName}
					onChange={state.onChangeAddName}
				/>
				<RaisedButton
					label="Add category"
					primary={true}
					icon={<ActionAdd />}
					onTouchTap={handelSave}
				/>


			</Drawer>
		</div>
	);
};

export default connect(
	state => ({
		store: state.storageCategories
	}),
	dispatch => ({
		toolsClose      :  ev => dispatch({type : StorageCategory.addingToolsClose}),
		toolsOpen       :  ev => dispatch({type : StorageCategory.addingToolsOpen}),
		onChangeAddName : ev => dispatch({type : StorageCategory.createMode, data : ev.target.value}),
		save : data => dispatch({type : StorageCategory.create, data : data}),
		showAlert : (mess, type) => dispatch({
			type : AlertAction.show ,
			data : {
				message : mess,
				status  : type
			}
		}),
	})
)(CategoriesTools);
