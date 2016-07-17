var powerboxDescriptors = {
	// from https://github.com/zarvox/sandstorm-test-python/blob/master/templates/index.html
	ipNetwork: "EAZQAQEAABEBF1EEAQH_QCAqemtXgqkAAAA", // 12214421258504904768,
	ipInterface: "EAZQAQEAABEBF1EEAQH_-tY-6W5QLOMAAAA", // 16369547182874744570,
};

function requestToken(serializedPowerboxDescriptor) {
	window.parent.postMessage({
		powerboxRequest: {
			rpcId: "1",
			query: [serializedPowerboxDescriptor]
		}
	}, "*");
}

function saveToken(token, descriptor) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				document.location.reload(true);
			} else {
				console.log("failed to save token");
			}
		}
	};

	var capSaveUrl = window.location.protocol + "//" + window.location.host + "/caps";
	var capData = {
		token: token,
		descriptor: descriptor
	};

	console.log(capData);

	xhr.open("POST", capSaveUrl, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
	xhr.send(JSON.stringify(capData));
}

function receiveMessage(event) {
	if (event.data.rpcId === "0") {
		if (event.data.error) {
			console.log("Error: " + event.data.error);
		}
	} else if (event.data.rpcId === "1") {
		if (event.data.error) {
			console.log("Error: " + event.data.error);
		} else {
			saveToken(event.data.token, event.data.descriptor);
		}
	}
}

window.addEventListener("message", receiveMessage);
requestToken(powerboxDescriptors.ipNetwork);
