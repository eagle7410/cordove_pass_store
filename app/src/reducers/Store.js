import {
	PREFIX_STORE as PREFIX
} from '../const/prefix'

const initialState = {
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
		title: 'Joxi'
	},
	{
		answer: '',
		category: 8,
		desc: 'eaglr.eagle@mail.ru',
		id: 3,
		login: 'login3',
		pass: 'pass3',
		title: 'RadioRokcs'
	},
	{
		answer: '',
		category: 7,
		desc: '',
		id: 4,
		login: 'login4',
		pass: 'pass4',
		title: 'WiFi '
	}
	]
};

const Store = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
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
				items: action.data
			};
	}

	return state;
};

export {Store};
