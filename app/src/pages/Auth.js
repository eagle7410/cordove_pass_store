import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import connect from "react-redux/es/connect/connect";
//Material comps
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//My comps
import SingIn from '../Components/Auth/SingIn'
import SingUp from '../Components/Auth/SingUp'

//CONST
import {PREFIX_ACCOUNT as PREFIX} from '../const/prefix'

const Auth = (state) => {
	const {classes} = state;
	const {
		accountActiveTab:activeTab
	} = state.store;

	let  tabContent;

	switch (activeTab) {
		case 0:
			tabContent=<SingIn/>;
			break;
		case 1:
			tabContent=<SingUp/>;
			break;
		default:
			tabContent=<div>No set</div>
	}

	return (
		<main className={classes.main}>
			<CssBaseline/>
			<Paper className={classes.paper}>
				<AppBar position="static" color="primary">
					<Tabs
						onChange={state.changeTab}
						classes={styles.appBar}
						value={activeTab}
						variant="scrollable"
						indicatorColor="secondary"
						scrollButtons="off"
					>
						<Tab label="Sign in" icon={<LockOutlinedIcon />} />
						<Tab label="Sign up" icon={<AccountBoxIcon />} />
					</Tabs>
				</AppBar>
				{tabContent}
			</Paper>
		</main>
	);
};

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',

		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	appBar : {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.background.paper,
	}
});

export default connect(
	state => ({
		store : state.Account
	}),
	dispatch => ({
		changeTab : ($ev, value) => dispatch({type : `${PREFIX}ChangeTab`, value}),
	})
)(withStyles(styles)(Auth))
