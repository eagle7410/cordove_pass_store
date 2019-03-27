import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {PREFIX_MENU_LEFT as PREFIX} from "../../const/prefix";
import {withStyles} from "@material-ui/core";
import {classes} from "../../const/styles";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import StorageIcon from "@material-ui/icons/Storage"
import CategoriesIcon from "@material-ui/icons/SortByAlpha"

import MenuLeftItem from './MenuLeftItem'

const MenuMain = (state) => {

	const { classes, theme } = state;

	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: classNames(classes.drawerPaper, !state.store.open && classes.drawerPaperClose),
			}}
			open={state.store.open}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={state.close}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				<MenuLeftItem label={'Data list'} path={'/data-list'}>
					<StorageIcon />
				</MenuLeftItem>
				<MenuLeftItem label={'Categories'} path={'/categories'}>
					<CategoriesIcon />
				</MenuLeftItem>
			</List>
		</Drawer>
	);
};

export default connect(
	state => ({
		store: state.MenuLeft,
	}),
	dispatch => ({
		close : () => dispatch({type :`${PREFIX}Close`}),
	})
)(withStyles(classes, { withTheme: true })(MenuMain))
