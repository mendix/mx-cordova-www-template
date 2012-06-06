(function() {
	var baseUrl = "";
	
	window.startup = function(url) {
		baseUrl = url;
		
		// On release builds, Dojo is included in mobile.js and djConfig is explicitly set,
		// so we can't set any configuration using djConfig here.  As a workaround, we implement
		// OpenAjax.hub.registerLibrary(), which is called by Dojo if it exists, but is not used
		// otherwise in our Dojo build and set the configuration there.
		window.OpenAjax = {
	    	hub : {
	    		registerLibrary : function() {
	    			dojo.config.baseUrl = baseUrl + "/mxclientsystem/dojo/";
	    			dojo.config.appbase = baseUrl + "/";
	    		}
	    	}
		};
	};
	
	window.addCss = function(href) {
		var head = document.getElementsByTagName("head")[0];
		
		var link   = document.createElement("link");
		link.type  = "text/css";
		link.rel   = "stylesheet";
		link.href  = baseUrl + "/" + href;
		link.media = "screen";
		
	    head.appendChild(link);
	    
	    return link;
	};
	
	window.addScript = function(href) {
		var head = document.getElementsByTagName("head")[0];
		
		var script  = document.createElement("script");
	    script.type = "text/javascript";
	    script.src  = baseUrl + "/" + href;    
	    
	    head.appendChild(script);
	    
	    return script;
	};
	
	window.overrideMenubarConfig = function() {
		var oldFunc = mx.session.startup;
		
		mx.session.startup = function() {
			var menuConfig = mx.session.getConfig("uiconfig.menubar");
			
			for (var i = 0, item; item = menuConfig[i]; ++i) {
				if (item.icon) {
					item.icon = baseUrl + "/" + item.icon;
				}
			}
			
			return oldFunc.apply(mx.session, arguments);
		};
	};
	      	
	window.overrideWidgetProperty = function(widget, property) {
		var proto   = mobile.widget[widget].prototype,
		    oldFunc = proto.postMixInProperties;
		
		proto.postMixInProperties = function() {
			if (this[property]) {
				this[property] = baseUrl + "/" + this[property];
			}
			
			return oldFunc.apply(this, arguments);
		};
	};
})();