import {get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const fullData = () => new Promise((ok, bad) => get(Routes.appInit)
	.then(
		r => ok({
			"categories":{
				"2":"All Categories",
				"3":"Unknown"
			},
			"settings":{
				"dbox":{
					"isHaveConfig":false
				},
				"google":{
					"isHaveConfig":false
				}
			},
			"storage":[],
			"users":[
				{
					"_id":2,
					"login":"test",
					"pass":"52c453a352e11c94ea95f4a6ac4c1354bd762f6e57dbcd54012f50684be17694"
				}
			]
		})
		, bad
	));

export {fullData};
