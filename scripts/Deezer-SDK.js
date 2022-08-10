
  window.dzAsyncInit = function() {
	DZ.init({
		appId  : '551262',
		channelUrl : 'http://localhost:5500/star/standard/explore.html'
	});
  };

  DZ.ready(function(sdk_options){
	console.log('DZ SDK is ready', sdk_options);
});