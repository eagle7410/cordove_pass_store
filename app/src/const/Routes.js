const routes = {
	login    : '/login',
	logout   : '/logout',
	storage  : '/storage',
	settings : '/settings',
	users    : '/users',
	dataLoader: '/data-loader'
};

const afterAuth = routes.storage;
const index     = routes.storage;

export {routes, afterAuth, index};
