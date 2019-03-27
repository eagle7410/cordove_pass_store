import {PREFIX_ACCOUNT as PREFIX} from '../const/prefix'

const initialCredentials = {
	isShowConfig: false,
	isShowPassword: false,
	isLoad: false,
	email: '',
	password: '',
	config: ''
};

const initialState = {
	isAuth: false,
	accountActiveTab: 0,
	credentials: [],
	newCredentials: {...initialCredentials}
};

const Account = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}Init`:
			return {
				...state,
				isAuth: false,
			};
		case `${PREFIX}SetCredential`:
			return {
				...state,
				credentials: action.data || [],
			};
		case `${PREFIX}AddCredential`:
			return {
				...state,
				newCredentials: {...initialCredentials},
				credentials: state.credentials.concat([action.data]),
				isAuth: true
			};
		case `${PREFIX}ConfigLoadRun`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					isLoad: true
				}
			};
		case `${PREFIX}ToggleShowPassword`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					isShowPassword: !state.newCredentials.isShowPassword
				}
			};
		case `${PREFIX}ToggleShowConfig`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					isShowConfig: !state.newCredentials.isShowConfig
				}
			};
		case `${PREFIX}ChangeConfig`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					config: action.value
				}
			};
		case `${PREFIX}ChangeTab`:
			return {
				...state,
				accountActiveTab: action.value
			};
		case `${PREFIX}ChangePassword`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					password: action.value
				}
			};
		case `${PREFIX}ChangeEmail`:
			return {
				...state,
				newCredentials: {
					...state.newCredentials,
					email: action.value
				}
			};
	}

	return state;
};

export {Account}
