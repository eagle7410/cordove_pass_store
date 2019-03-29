import {
	PREFIX_STORE_FILTERS as PREFIX
} from '../const/prefix'

const initialState = {
	category: -1,
	titleLogin : '',
	answer: '',
	description: ''
};

const StoreFilters = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}Change`:
			const {field, value} = action.data;

			return {
				...state,
				[field]: value
			};
	}

	return state;
};

export {StoreFilters};
