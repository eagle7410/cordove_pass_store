import {
	PREFIX_STORE_ADD as PREFIX
} from '../const/prefix'

const initialState = {
	id          : null,
	isOpen      : false,
	isLoad      : false,
	title       : '',
	login       : '',
	isShowPassword  : false,
	pass        : '',
	category    : -1,
	answer      : '',
	desc  : ''
};

const StoreAdd = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}LoadRun`:
			return {
				...state,
				isLoad : true
			};
		case `${PREFIX}LoadStop`:
			return {
				...state,
				isLoad : false
			};
		case `${PREFIX}ToggleShowPassword`:
			return {
				...state,
				isShowPassword : !state.isShowPassword
			};
		case `${PREFIX}ChangeField`:
			return {
				...state,
				[action.data.field] : action.data.value
			};
		case `${PREFIX}Edit`:
			return {
				...initialState,
				...action.data,
				isOpen : true
			};
		case `${PREFIX}Open`:
			return {
				...initialState,
				isOpen : true
			};
		case `${PREFIX}Close`:
			return {
				...initialState,
				isOpen : false
			};
	}

	return state;
};

export {StoreAdd};

