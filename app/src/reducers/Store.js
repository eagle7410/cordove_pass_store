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
	items : [
	{
		answer: 'answer2',
		category: 5,
		desc: '',
		id: 2,
		login: 'login2',
		pass: 'pass2',
		isShowPassword : false,
		title: 'Joxi'
	},
	{
		answer: '',
		category: 8,
		desc: 'eaglr.eagle@mail.ru',
		id: 3,
		login: 'login3',
		pass: 'pass3',
		isShowPassword : false,
		title: 'RadioRokcs'
	},
	{
		answer: '',
		category: 7,
		desc: '',
		id: 4,
		login: 'login4',
		pass: 'pass4',
		isShowPassword : false,
		title: 'WiFi '
	}
	]
};

const Store = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
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
