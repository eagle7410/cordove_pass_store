import {
	PREFIX_STORE as PREFIX
} from '../const/prefix'

const initialState = {
	isShowFilters: false,
	page: 0,
	selected : [],
	rowsPerPage : 10,
	order : 'desc',
	orderBy : 'id',
	items : [],
};

const Store = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}EditRecord`:
			return {
				...state,
				items : state.items.map(row => row.id === action.data.id ? {...row, ...action.data} : row)
			};
		case `${PREFIX}Remove`:
			return {
				...state,
				items : state.items.filter(row => row.dbId !== action.data.dbId)
			};
		case `${PREFIX}AddRecord`:
			return {
				...state,
				items : state.items.concat([{...action.data}])
			};
		case `${PREFIX}ToggleShowFilters`:
			return {
				...state,
				isShowFilters : !state.isShowFilters
			};
		case `${PREFIX}ToggleShowPass`:
			return {
				...state,
				items : state.items.map(d => {
					if (d.id === action.data) d.isShowPassword = !d.isShowPassword;

					return d;
				})
			};
		case `${PREFIX}SetPage`:
			return {
				...state,
				page : action.data
			};
		case `${PREFIX}SetRowsOnPage`:
			return {
				...state,
				rowsPerPage : action.data
			};
		case `${PREFIX}Set`:
			return {
				...state,
				items: Object.entries(action.data).map(([dbId, item]) => ({...item, isShowPassword : false, dbId})),
			};
	}

	return state;
};

export {Store};
