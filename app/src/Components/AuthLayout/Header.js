import React from 'react';
import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography/Typography";
import AppBar from "@material-ui/core/AppBar/AppBar";

import {PREFIX_MENU_LEFT as PREFIX} from "../../const/prefix";
import {withStyles} from "@material-ui/core";
import LogoutIcon from "@material-ui/icons/ExitToApp"

const Header = (state) => {

	const { classes } = state;

	// eslint-disable-next-line
	return (
		<AppBar
			position="absolute"
			className={classNames(classes.appBar, state.store.open && classes.appBarShift)}
		>
			<Toolbar disableGutters={!state.store.open}>
				<IconButton
					color="inherit"
					aria-label="Open drawer"
					onClick={state.open}
					className={classNames(classes.menuButton, state.store.open && classes.hide)}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					className={classes.title}
				>
					{state.title}
				</Typography>
				<Button color="inherit" >
						<LogoutIcon /> Logout
				</Button>
			</Toolbar>

		</AppBar>
	);
};
const drawerWidth = 240;
const styles = theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9,
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: '100vh',
		overflow: 'auto',
	},
	chartContainer: {
		marginLeft: -22,
	},
	tableContainer: {
		height: 320,
	},
	h5: {
		marginBottom: theme.spacing.unit * 2,
	},
});

export default connect(
	state => ({
		store : state.MenuLeft,
	}),
	dispatch => ({
		open  : () => dispatch({type :`${PREFIX}Open`})
	})
)(withStyles(styles, { withTheme: true })(Header))
