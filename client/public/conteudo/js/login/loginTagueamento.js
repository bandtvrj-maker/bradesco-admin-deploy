jQuery(window).ready(function () {
  try {
    setTimeout(function () {
      checkForGTM();
    }, 600);
    
  } catch (error) {
  }
});

function checkForGTM() {
  try {
    loadGoogleTagManager();
  } catch (error) {
  }
}

function loadGoogleTagManager() {
	if (!(navigator.userAgent.indexOf("NetExpress") >= 0)) {
		  (function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
			var f = d.getElementsByTagName(s)[0],
			  j = d.createElement(s),
			  dl = l != "dataLayer" ? "&l=" + l : "";
			j.async = true;
			j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
			f.parentNode.insertBefore(j, f);
		  })(window, document, "script", "dataLayer", "GTM-WD86FGS");

	}
}

function eventViewPage(nomeTela, url, typeProduct, typeFlow) {
  checkForGTM();
  try {
	  if (!(navigator.userAgent.indexOf("NetExpress") >= 0)) {
			window.dataLayer.push({
			  event: "page_view",
			  event_type: "new",
			  page: {
				page_location: nomeTela,
				page_title: url
			  },
			  product: {
				product: typeProduct,
				flow: typeFlow
			  },
			  user: {
				perfil_investidor: undefined,
				user_id: undefined,
				segment: undefined,
				logged_user: undefined,
				ownership: undefined
			  }
			});
	  }
  } catch (error) {
  }
}

function eventClickBtn(locationEvent, typeAction, bottonName, typeProduct, typeFlow) {
  try {
	   if (!(navigator.userAgent.indexOf("NetExpress") >= 0)) {
			window.dataLayer.push({
			  event: "Event_Data",
			  event_type: "new",
			  ga_event: {
				location: locationEvent,
				action: typeAction,
				element_name: bottonName
			  },
			  product: {
				product: typeProduct,
				flow: typeFlow
			  },
			  user: {
				perfil_investidor: undefined,
				user_id: undefined,
				segment: undefined,
				logged_user: undefined,
				ownership: undefined
			  }
			});
	   }
  } catch (error) {
  }
}