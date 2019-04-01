import React from "react";
import {connect} from "react-redux";
// MD
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';
import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import {PREFIX_STORE as PREFIX, PREFIX_STORE_ADD as STORE_ADD} from "../../const/prefix";

const TableTools = state => {

	const {classes} = state;

	const {
		isShowFilters
	} = state.store;

	return (
		<Toolbar className={classes.root}>
			<div className={classes.title}>
				{(
					<Typography variant="h6" id="tableTitle">
						Data list
					</Typography>
				)}
			</div>
			<div className={classes.spacer}/>
			<div className={classes.actions}>
				{
					[
						(
							<Tooltip title="Filters list" key={'dataToolFilter'}>
								<Fab color="primary" aria-label="Filters"
								     className={isShowFilters ? classes.fabRotate : classes.fab}
								     onClick={state.toggleShowFilters}
								>
									<FilterIcon variant="contained"/>
								</Fab>
							</Tooltip>
						),
						(
							<Tooltip title="Add to list" key={'dataToolAdd'}>
								<Fab color="primary" aria-label="Add" className={classes.fab}
								     onClick={state.add}
								>
									<AddIcon variant="contained"/>
								</Fab>
							</Tooltip>
						),
					]
				}
			</div>
		</Toolbar>
	);
};

const style = theme => ({
	root: {
		paddingRight: theme.spacing.unit,
	},
	fab: {
		marginLeft: 4,
		transitionDuration: '0.2s',
		transitionProperty: 'transform',
		transform: 'rotate(360deg)',
		webkitTransform: 'rotate(360deg)'
	},
	fabRotate: {
		transitionDuration: '0.2s',
		transitionProperty: 'transform',
		transform: 'rotate(180deg)',
		webkitTransform: 'rotate(180deg)'
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	spacer: {
		flex: '1 1 100%',
	},
	actions: {
		display: 'inherit',
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
});

export default connect(
	state => ({
		store: state.Store
	}),
	dispatch => ({
		add: () => dispatch({type: `${STORE_ADD}Open`}),
		toggleShowFilters: () => dispatch({type: `${PREFIX}ToggleShowFilters`}),
	})
)(withStyles(style)(TableTools));

