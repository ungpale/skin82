/*
 * jQuery Simple Instagram Fancybox
 *
 *
 * Author: Chris Rivers
 * xxcriversxx@gmail.com
 *
 * Changelog: 
 * Version: 2.2
 *
 */


$(document).ready(function(){

	// Calling the Plugin
	$('.demo').simpleInstagramFancybox({
		captionOn : true,
		mode : 'user',
		userID: '2465818205', // This a mandatory setting that allows you to specify a userid.
		accessToken : '2465818205.72f2316.e43f9428f90b40d1898ff10aeac82209', // This a mandatory setting that allows you to specify an access token.
	});

	// Demo Starter
	$('.start-demo').click(function(){
		$(window).scrollTop(600);
	});

	// Pretty-fy Demo	
	prettyPrint();

});