const FIREBASE_DOMAIN = "cmssimple-v1-aarb";

// this could be made dynamic eventually
const FIREBASE_SITE_SUFFIX = "defaultsite";

const FIREBASE_SITE_PATH = `https://${FIREBASE_DOMAIN}.firebaseio.com/${FIREBASE_SITE_SUFFIX}`;

import Firebase from "Firebase"

const fbRef = new Firebase(FIREBASE_SITE_PATH);

export function fb() {
	return fbRef;
}

//!!! build object defaults into these classes
//!!! build write capability into these or additional classes


// a helper for watching Firebase auth status
// encapsulates the logic for user records
// watchers are disposable and only intended for single use
export class FBUserWatcher {
	constructor() {
		this.fbRef = fb();
	}

	updateAuth (authData) {
		this.authData = authData;

		if (this.userRef) {
			//this.userRef.off();
			this.userRef = null;
		}
		else {
			this.callback(null);
		}

		if (this.authData) {
			this.userRef = this.fbRef.child(`user/${authData.uid}`)
			this.userRef.on("value", snapshot => {
				var user = snapshot.val();
				if (!user) {
					user = {};
					//!!! for the time being, we will initialize the user data with the auth email
					//!!! temporary
					user.name=authData.password.email;
					user.email=authData.password.email;
				}
				user.key=snapshot.key();

				this.callback(user);
			});
		}
	}

	// assigns a callback to receive updates about this set of objects
	// creates watchers for the firebase ref 
	// only a single callback is permitted in this implementation
	on(callback) {
		this.off();
	
		this.callback = callback;

		//when the auth data becomes available or is changed,
		//update the callback
		this.fbRef.onAuth(this.updateAuth.bind(this));
	}

	// removes the callback for updates to this set of objects
	//also removes the watchers for the firebase ref
	off() {
		
		//!!! Does this work or not?
		if (this.userRef)
			this.userRef.off();
		
		this.fbRef.offAuth(this.updateAuth);

		this.callback = null;
	}
}

// a helper for watching Firebase objects
// watchers are disposable and only intended for single use
export class FBObjectWatcher {

	//constructs a watcher for the given firebase ref
	constructor(fbRef) {
		this.callback = null;
		this.fbRef = fbRef;

		this.debugCount = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
	}

	// assigns a callback to receive updates about this set of objects
	// creates watchers for the firebase ref 
	// only a single callback is permitted in this implementation
	on(callback) {
		this.off();
		this.callback = callback;

		//the when the value becomes available or is changed,
		//update the callback
		this.fbRef.on("value", snapshot => {

			//console.log(this.debugCount, snapshot.ref().toString())
			//console.log(this.debugCount, snapshot.val())
			var item=snapshot.val();
			item.key=snapshot.key();
 		  this.callback(item);
			
    });
	}

	// removes the callback for updates to this set of objects
	//also removes the watchers for the firebase ref
	off() {	
		//!!! this bums firebase out for some reason
		//(a second request for the same data will return null!)
		//apparently we don't need to call off()?
		//but now it works???
		this.fbRef.off();

		this.callback = null;
	}
}

// a helper for watching Firebase sets
// watchers are disposable and only intended for single use
export class FBSetWatcher {

	//constructs a watcher for the given firebase ref
	constructor(fbRef) {
		//use a map instead of a {} object because it respects the order that fields are inserted
		this.items = new Map();
		this.callback = null;
		this.fbRef = fbRef;
	}

	// assigns a callback to receive updates about this set of objects
	// creates watchers for the firebase ref 
	// only a single callback is permitted in this implementation
	on(callback) {
		this.off();
		this.callback = callback;

		//the first time a child is loaded or when a new child is created
		//add it to the list
		this.fbRef.on("child_added", snapshot => {
			this.items.set(snapshot.key(), snapshot.val());
        	this.callback(this.items);
     	});

		//remove a child from the list when notified by firebase
       	this.fbRef.on("child_removed", snapshot => {
	        this.items.delete(snapshot.key());
					this.callback(this.items);
       	});

		//update a child in the list when notified by firebase
       	this.fbRef.on("child_changed", snapshot => {
					this.items.set(snapshot.key(), snapshot.val());
					this.callback(this.items);
       	});
	}

	// removes the callback for updates to this set of objects
	//also removes the watchers for the firebase ref
	off() {
		this.fbRef.off();
		this.callback = null;
	}
}