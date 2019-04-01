import {
	PREFIX_CATEGORIES as PREFIX
} from '../const/prefix'

// TODO: Back
// const initialState = {
// 	items: {},
// 	idMax : 0,
// 	page: 0,
// 	selected : [],
// 	rowsPerPage : 10,
// 	order : 'desc',
// 	orderBy : 'id',
// };

const initialState = {
	items: {
		'3': 'Unknown',
		'4': 'Home',
		'5': 'jobGlobal',
		'6': 'FreeLanche',
		'7': 'Internet',
		'8': 'Relax',
		'9': 'SocialNet',
		'10': 'Email',
		'11': 'AgriLab',
		'12': 'Resume'
	},
	idMax: 12,
	page: 0,
	selected: [],
	rowsPerPage: 10,
	order: 'desc',
	orderBy: 'id'
};

const Categories = (state = initialState, action) => {
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
			let items = {};
			let idMax = 0;

			for (let [id, name] of Object.entries(action.data)) {
				if (id > idMax) idMax = Number(id);
				if (name) items[id] = name;
			}

			return {
				...state,
				items,
				idMax
			};
	}

	return state;
};

export {Categories};
