/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function () {
		this.receivedEvent('deviceready');

	},

	// Update DOM on a Received Event
	receivedEvent: function (id) {
		var that = this;
		that._db = new window.BrowerDataBaseClass({name : 'pass_store'});
		that._db.init()

			.catch(function (err) {
				console.log('Error :', err);
			});
		that.runReact();
	},
	_db_struct : function () {
		var that = this;
		var constant = that._db.queryConst();

		return {
			users : {
				id: {
					type: constant.TYPE_INT,
						pk: {
						order: constant.ASC
					}
				},
				login: {
					type: constant.TYPE_CHAR+ '(20)' ,
					require: true,
					unique: true
				},
				pass: {
					type: constant.TYPE_CHAR
				}
			},
			settings : {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				type : {
					type: constant.TYPE_CHAR+ '(20)' ,
					require: true,
					unique: true
				},
				data : { type: constant.TYPE_TEXT }
			},
			categories : {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				name: {
					type: constant.TYPE_CHAR+ '(100)' ,
					require: true,
					unique: true
				},
			},
			storage : {
				id: {
					type: constant.TYPE_INT,
					pk: {
						order: constant.ASC
					}
				},
				category : {
					id: {
						type: constant.TYPE_INT,
						require: true
					},
				},
				title : {
					type: constant.TYPE_CHAR,
					require: true
				},
				login : {
					type: constant.TYPE_CHAR,
					require: true
				},
				pass  : {
					type: constant.TYPE_CHAR
				},
				answer : { type: constant.TYPE_CHAR },
				desc : { type: constant.TYPE_TEXT }
			},
		};
	},
	runReact : function () {
		if (!window.cordova) {
			window.appReact();
		} else {
			window.cordova.appReact();
		}
	}

};

app.initialize();
