// sandstorm network permission
function doRequest (serializedPowerboxDescriptor) {
  window.parent.postMessage({ powerboxRequest: {
      rpcId: '1',
      query: [serializedPowerboxDescriptor]
  }}, '*');
}

interfaces = {
  // Powerbox descriptors for various interface IDs.
  // from https://github.com/zarvox/sandstorm-test-python/blob/master/templates/index.html
  ipNetwork: 'EAZQAQEAABEBF1EEAQH_QCAqemtXgqkAAAA', // 12214421258504904768,
  ipInterface: 'EAZQAQEAABEBF1EEAQH_-tY-6W5QLOMAAAA', // 16369547182874744570,
}

var messageListener = function (event) {
	// TODO implement capnproto binding
  console.log('powerbox network access granted');
}

window.addEventListener('message', messageListener);

doRequest(interfaces.ipNetwork);
