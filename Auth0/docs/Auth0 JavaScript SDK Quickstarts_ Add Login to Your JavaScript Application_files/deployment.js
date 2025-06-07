var client_view_id="74485454";
function loadLiftAI(){
    var c=document.createElement("script");
    c.type="text/javascript";
    c.src="https://lift-ai-js.marketlinc.com/auth0.com/snippet.js?viewId\x3d"+client_view_id;
    c.id="vs_snippet_script_id";document.getElementsByTagName("head")[0].appendChild(c)
}
try{
    loadLiftAI()
} catch(c){}
var ML_getCookie = function(e){const o=encodeURIComponent(e)+"=",n=document.cookie.split(";");for(let e=0;e<n.length;e++){let t=n[e];for(;" "===t.charAt(0);)t=t.substring(1);if(0===t.indexOf(o)){const e=t.substring(o.length,t.length);try{return decodeURIComponent(e)}catch(e){return console.error("Error decoding cookie:",e.message),""}}}return""}
var ML_setCookie=function(e,t,i){var o=new Date;o.setTime(o.getTime()+864e5*i);var n="expires="+o.toUTCString();document.cookie=e+"="+t+";domain=.auth0.com;"+n+";path=/"};
try{var ml_vs_score=ML_getCookie("vs_conv_ai"),ml_score_int=parseInt(ml_vs_score.split("-")[1]),ml_intent_band=function(e){return e>60?"High Intent":e>30&&e<=60?"Mid Intent":"Low Intent"};ML_setCookie("vs_intent",ml_intent_band(ml_score_int)),""!=ml_vs_score&&null==sessionStorage.getItem("ml_old_score")&&sessionStorage.setItem("ml_old_score",ml_vs_score);var ml_check_cookie_update_Interval=setInterval((function(){try{var e=sessionStorage.getItem("ml_old_score");if(""!=ml_vs_score&&(ml_vs_score!=ML_getCookie("vs_conv_ai")||e!=ML_getCookie("vs_conv_ai"))){sessionStorage.setItem("ml_old_score",ML_getCookie("vs_conv_ai"));var _=ML_getCookie("vs_conv_ai"),t=parseInt(_.split("-")[1]);ML_setCookie("vs_intent",ml_intent_band(t))}}catch(e){}}),1e4);}catch(e){}


var ml_drift_load_count = 0;
function ml_drift_load(){
	if(("drift" in window && "scoring" in window) || ml_drift_load_count > 8){
		// try{
		// 	drift.on('ready', function() {
		// 		var lai_intent = ml_scoring_band()
		// 		drift.api.setUserAttributes({
		// 			'Lift AI Intent Segment' : lai_intent.ml_vs_band,
		// 			'Lift AI Score': lai_intent.ml_score_range,
		// 			'Lift AI VID'	:	ML_getCookie('vs_vid')
		// 		});
		// 	});
		// }catch(e){
		// 	// DO NOTHING
		// }

		//Communicating with iframe - sending cookie values
		var vsIntent = ML_getCookie("vs_intent");
			var vsConvAI = ML_getCookie("vs_conv_ai");
			var vsVID = ML_getCookie("vs_vid");		
			function checkIframe() {
				setTimeout(function(){
					try {
						var ml_iframe = document.getElementById('drift-iframe');
						if(ml_iframe){
							var targetOrigin = new URL(ml_iframe.src).origin		
							if (ml_iframe && ml_iframe.contentWindow) {
										ml_iframe.contentWindow.postMessage({
											type: 'setCookieValues',
											vsIntent: vsIntent,
											vsConvAI: vsConvAI,
											vsVID: vsVID
										}, targetOrigin);  
									}
						}else{
							// setTimeout(checkIframe,1000);
						}
					} catch (error) {
						console.error("iframe code error:", error);
					}
				},1000);
			}
			checkIframe();

		try {
			
			window.addEventListener("message", function(event) {
				// Check if the message is from the Drift iframe
				if (event.origin === "https://drift.app.auth0.com" && event.data && event.data.type) {
					if (event.data.type === "drift:ga:conversation:firstInteraction") {
						window.scoring.tracking.pageEvents({
							"event": "DRIFT_PLAY_BOOK_CLICKED",
							"d_campaign"	: event.data.data.campaignId,
							"d_playbook"	: event.data.data.playbookId,
							"d_cid"		: event.data.data.conversationId,
							"d_vid" : ML_getCookie("driftt_aid")
						});

						window.scoring.tracking.pageEvents({
							"event": "DRIFT_CHAT_STARTED",
							"d_campaign"	: event.data.data.campaignId,
							"d_playbook"	: event.data.data.playbookId,
							"d_cid"		: event.data.data.conversationId,
							"d_vid" : ML_getCookie("driftt_aid")
						});

					}
					if (event.data.type === "drift:ga:emailCapture") {
						window.scoring.tracking.pageEvents({
							"event": "DRIFT_EMAIL_CAPTURED",
							"d_campaign"	: event.data.data.campaignId,
							"d_playbook"	: event.data.data.playbookId,
							"d_cid"		: event.data.data.conversationId,
							"d_vid" : ML_getCookie("driftt_aid")
						}) ;
					}
					if (event.data.type === "drift:ga:scheduling:meetingBooked") {
						window.scoring.tracking.pageEvents({
							"event": "DRIFT_MEETING_BOOKED"
						}) ;
					}
					if (event.data.type === "drift:ga:phoneCapture") {
						window.scoring.tracking.pageEvents({
							"event": "DRIFT_PHONE_NUMBER_CAPTURED"
						}) ;
					}
				}
			}, false);

		} catch (error) {
			console.log("ML::"+error)
		}

		try {
			drift.on("conversation:playbookFired", function(data) {
				// console.log("Playbook fired: " + JSON.stringify(data))
				window.scoring.tracking.pageEvents({
					"event": "DRIFT_PLAY_BOOK_FIRED",
					"d_campaign"	: data.campaignId,
					"d_playbook"	: data.playbookId,
					"d_cid"		: data.conversationId,
					"d_vid" : ML_getCookie("driftt_aid")
				});
			});
		
		
			drift.on("conversation:playbookClicked", function(data) {
				window.scoring.tracking.pageEvents({
					"event": "DRIFT_PLAY_BOOK_CLICKED",
					"d_campaign"	: data.campaignId,
					"d_playbook"	: data.playbookId,
					"d_cid"		: data.conversationId,
					"d_vid" : ML_getCookie("driftt_aid")
				}) ;
			});
	
			
			/*
			*  Conversation Start
			*  @Captures start of a conversation along with conversation id
			*/
			drift.on('startConversation', function (event) {
				// console.log("startConversation")
				window.scoring.tracking.pageEvents({
				"event": "DRIFT_CHAT_STARTED",
				"d_cid": JSON.stringify(event.conversationId),
				"d_vid" : ML_getCookie("driftt_aid")
				});
			});
	
			/*
			*      Meeting Booked
			*/
			drift.on("scheduling:meetingBooked", function(data) {	 
				window.scoring.tracking.pageEvents({
				"event": "DRIFT_MEETING_BOOKED"
				}) ;
			});
	
			/*
			*      Email capture campaign
			*/
	
			drift.on("emailCapture", function(data) {
				// console.log("user identified as: " + JSON.stringify(data));
				window.scoring.tracking.pageEvents({
				"event": "DRIFT_EMAIL_CAPTURED"
				}) ;
			});
	
			/*
			*      Phone captured in chat
			*/
			drift.on("phoneCapture", function(data) {
				// console.log("User provided a phone number: " + JSON.stringify(data))
				window.scoring.tracking.pageEvents({
				"event": "DRIFT_PHONE_NUMBER_CAPTURED"
				}) ;
			});
		} catch (error) {
			
		}
		

		var ml_url = document.location.href;
			ml_url = ml_url.toLowerCase();

		var ml_connect_with_us_button = document.querySelector("form:nth-child(3) > fieldset:nth-child(5) > button")
		if(ml_connect_with_us_button){
			try {
				ml_connect_with_us_button.addEventListener('click', function(event) {
					window.scoring.tracking.pageEvents({
						"event": "Contact_Us"
						}) ;
				});
			} catch (error) {
				
			// Nothing
			}
		}
		

		var ml_signup_button = document.querySelector("#database")
		if(ml_signup_button){
			try {
				ml_signup_button.addEventListener('click', function(event) {
					window.scoring.tracking.pageEvents({
						"event": "Sign_Up"
						}) ;
				});
			} catch (error) {
				
			// Nothing
			}
		}
	} else{
		setTimeout(ml_drift_load, 1000);
		ml_drift_load_count++;
	}
}

ml_drift_load();
