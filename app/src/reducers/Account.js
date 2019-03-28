import {PREFIX_ACCOUNT as PREFIX} from '../const/prefix'

const initialCredentials = {
	isShowConfig: false,
	isShowPassword: false,
	email: '',
	password: '',
	config: ''
};
// TODO: Back
const initialState = {
	isAuth: true,
	isLoad: false,
	accountActiveTab: 0,
	credentials: [],
	emailSelected : "",
	newCredentials: {...initialCredentials}
};

const Account = (state = initialState, action) => {
	// eslint-disable-next-line
	switch (action.type) {
		case `${PREFIX}IsAuth`:
			return {
				...state,
				isAuth: true,
			};
		case `${PREFIX}SelectEmail`:
			return {
				...state,
				emailSelected: action.data,
			};
		case `${PREFIX}Init`:
			return {
				...state,
				accountActiveTab: 0,
				newCredentials: {...initialCredentials},
				isAuth: false,
				isLoad: false,
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
				isLoad: true,
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
