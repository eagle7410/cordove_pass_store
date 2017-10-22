import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {styleIconDisable, styleIconEnable, styleCloseTools
	} from '../../../const/Styles'

import ActionEnable from 'material-ui/svg-icons/action/check-circle';
import ActionDisable from 'material-ui/svg-icons/action/highlight-off';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionOpen from 'material-ui/svg-icons/action/reorder';
import Drawer from 'material-ui/Drawer';

const CouldConnect = (state) => {

	return (
		<Paper>
			<Toolbar>
				<ToolbarGroup >
					<IconButton tooltip="Open tools"
					            disabled={state.store.isToolsOpen}
					            onTouchTap={state.tools_open}
					>
						<ActionOpen />
					</IconButton>
					{state.store.init ?<ActionEnable style={styleIconEnable}/> : <ActionDisable style={styleIconDisable}/> }
					<span style={{margin : 10}}>Connect init</span>
				</ToolbarGroup>
			</Toolbar>
			<Drawer
				open={state.store.isToolsOpen}
			>

				<RaisedButton
					label={'Init'}
					primary={true}
					disabled={!state.store.isHaveConfig || state.store.init}
					onTouchTap={state.init}
				/>
				<div>
					{state.store.isHaveConfig ?<ActionEnable style={styleIconEnable}/> : <ActionDisable style={styleIconDisable}/> }
					<span style={{margin : 15}}>Have config</span>

				</div>
			</Drawer>
		</Paper>


	);
};

export default CouldConnect;
