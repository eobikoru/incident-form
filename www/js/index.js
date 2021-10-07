

App.controller('home', function (page) {
    // put stuff here
  });

  App.controller('page2', function (page) {
    // put stuff here
  });

  try {
    App.restore();
  } catch (err) {
    App.load('home');
  }







document.addEventListener("deviceready", onDeviceReady, false);

console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);

function onDeviceReady() {
	// Cordova is now initialized. Have fun!
	//checkConnection();
	getBlogPosts();


	document.addEventListener("offline", onOffline, false);

	document.addEventListener("online", onOnline, false);
}

function checkConnection() {
	var networkState = navigator.connection.type;

	var states = {};
	//states[Connection.UNKNOWN] = "Unknown connection";
	states[Connection.ETHERNET] = "Ethernet connection";
	states[Connection.WIFI] = "WiFi connection";
	states[Connection.CELL_2G] = "Cell 2G connection";
	states[Connection.CELL_3G] = "Cell 3G connection";
	states[Connection.CELL_4G] = "Cell 4G connection";
	states[Connection.CELL] = "Cell generic connection";
	states[Connection.NONE] = "No network connection";
	alert("Connection type: " + states[networkState]);
}

function onOffline() {
	alert("Lost connection");
}

function onOnline() {
	networkState = navigator.connection.type;
	if (networkState !== Connection.NONE) {
		alert("Online");
	}

}

function getBlogPosts() {
	//const textPrimary = document.querySelector(".text-primary");
	//const title = document.querySelector("#title");
	//const content = document.querySelector("#content");
	const addPostButton = document.querySelector("#submitButton");
	const long = document.querySelector("#ICORF_Longitude");
	const lat = document.querySelector("#ICORF_Latitude");
	const name = document.querySelector("#name1");
	const report = document.querySelector("#report1");
	const describe = document.querySelector("#describe1");
	const photo = document.querySelector("#photo1");
	
	


	// to get the posts
	fetch("http://emekaobi.atwebpages.com/wp-json/wp/v2/posts")
		.then((response) => {
			return response.json();
		})
		.then((posts) => {
			console.log(posts);
			console.log(posts[0].content.rendered);

			textPrimary.classList.remove("spinner-border");
			textPrimary.insertAdjacentHTML(
				"beforeend",
				`<h1 class="h1 text-info text-capitalize mb-3">Recent Posts</h1>`
			);
			posts.forEach((post) => {
				textPrimary.insertAdjacentHTML(
					"beforeend",
					`<div class="articles card border-2  mb-3">
   <h2 class="card-title card-header text-info">${post.title.rendered}</h2>
   <p class="card-text px-2">${post.content.rendered}</p>
  </div>`
				);
			});
		});

	// to authenticate user
	fetch("http://emekaobi.atwebpages.com/wp-json/jwt-auth/v1/token", {
		method: "POST",
		headers: {
			"content-Type": "application/json",
			accept: "application/json",
		},
		body: JSON.stringify({
			username: "emekadaniel916@gmail.com",
			password: "Emeka@111"
		}),
	})
		.then((response) => {
			return response.json();
		})
		.then((user) => {
			console.log(user);
			console.log(user.token);
			localStorage.setItem("jwt", user.token);
		});

	//add post
	function addpost() {
		fetch("http://emekaobi.atwebpages.com/wp-json/wp/v2/posts", {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				accept: "application/json",
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
			body: JSON.stringify({
				title: title.value,
				content: content.value,
				status: "publish",
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((post) => {
				console.log(post);
			});
	}

	addPostButton.addEventListener("click", () => {
		if (!title.value) {
			document.querySelector(".invalidTitle").style.display = "block";
		} else if (!content.value) {
			document.querySelector(".invalidContent").style.display = "block";
		} else {
			addpost();
			title.value = "";
			content.value = "";
			posts.forEach((post) => {
				textPrimary.insertAdjacentHTML(
					"beforeend",
					`<div class="articles card border-2  mb-3">
   <h2 class="card-title card-header text-info">${post.title.rendered}</h2>
   <p class="card-text px-2">${post.content.rendered}</p>
  </div>`
				);
			});
		}
	});
}





var ICORF_delayInSeconds = 6;
var tickTockID;
var done_sec = 333;
var start_when = new Date();
var doneWhen = new Date();
var canvas;
var context;
var x;
var y;
var radius;
var endPercent;
var curPerc;
var counterClockwise;
var circ;
var quart;
var ticksPerSecond = 5;

function setUpAnimation() {
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	x = canvas.width / 2;
	y = canvas.height / 2;
	radius = 35;
	endPercent = 100;
	curPerc = 0;
	counterClockwise = false;
	circ = Math.PI * 2;
	quart = Math.PI / 2;
	context.lineWidth = 10;
	context.strokeStyle = '#ad2323';
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 10;
	context.shadowColor = '#656565';
}

function waitingTickTock() {
	var p = document.getElementById("ICORF_remainingSeconds");
	//done_sec = done_sec - 1;
	done_tics = done_tics - 1;
	done_sec = Math.floor(done_tics / ticksPerSecond);
	var delayInTics = ICORF_delayInSeconds * ticksPerSecond;
	var amtDone = (delayInTics - done_tics) / delayInTics;
	p.innerHTML = done_sec.toString();
	animate(amtDone, done_sec.toString());
	if (done_tics < 0) {
		RemoveModal();
		submitReport();
		//alert("should submit now");
	}

}

function decideDisplayModal() {
	if (ICORF_delayInSeconds == 0) {
		submitReport();
	} else {
		DisplayModal();
		showlocation();
	}
}

function DisplayModal() {
	document.getElementById("overlay").style.height = document.height + 'px';
	document.getElementById("overlay").className = "OverlayEffect";
	document.getElementById("modalMsg").className = "ShowModal";
	// now drh stuff
	var mm = document.getElementById("modalMsg");
	mm.style.width = (window.innerWidth - 100) + 'px';
	canvas = document.getElementById('myCanvas');
	canvas.setAttribute("left", ((window.innerWidth - 100) / 2));
	scroll(0, 0);
	start_when = new Date();
	done_sec = ICORF_delayInSeconds;
	done_tics = ICORF_delayInSeconds * ticksPerSecond;
	doneWhen = start_when + (1000 * ICORF_delayInSeconds);
	waitingTickTock();
	setUpAnimation();
	tickTockID = window.setInterval(function() {
		waitingTickTock();
	}, 1000 / ticksPerSecond);

}

function RemoveModal() {
	window.clearInterval(tickTockID);
	document.getElementById("modalMsg").className = "HideModal";
	document.getElementById("overlay").className = "";
	return false;
}

function submitReport() {
	var b = document.getElementById("submitButton");
	b.disabled = true;
	var f = document.getElementById("locform");
	f.submit();
}


function animate(current, lbl) {
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	x = canvas.width / 2;
	y = canvas.height / 2;
	radius = 35;
	endPercent = 100;
	curPerc = 0;
	counterClockwise = false;
	circ = Math.PI * 2;
	quart = Math.PI / 2;
	context.lineWidth = 10;
	context.strokeStyle = '#ad2323';
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 10;
	context.shadowColor = '#656565';

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
	context.stroke();
	context.font = "20px Arial";
	var m = context.measureText(lbl);
	var tx = x - (m.width / 2);
	var ty = y + 5;
	context.fillText(lbl, tx, ty);
}



function callback(position) {
	
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var acc = position.coords.accuracy;
	var alt = position.coords.altitude;
	
	document.getElementById('ICORF_Latitude').value = lat;
	document.getElementById('ICORF_Longitude').value = lon;
	document.getElementById('ICORF_HorizAccuracy').value = acc;
	document.getElementById('ICORF_Altitude').value = alt;
	
	var timestamp = new Date();
	document.getElementById('ICORF_DeviceTime').value = timestamp;
}















