(function() {
    var host = 'http://95.211.38.104/index.php';
    var cidVariable = 'epcid';
    var keyVariable = 'key';
    var hostVariable = 'host';

    window.urlVars = getUrlVars();
    clearHash();

    var tid = setInterval(function() {
        if (document.readyState !== 'complete') return;
        clearInterval(tid);
	    init();
    }, 100);
    
    function init() {
        if (!window.jQuery) {
            var jq = document.createElement('script');
            jq.type = 'text/javascript';
            jq.src = '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';
            document.getElementsByTagName('head')[0].appendChild(jq);
            jq.addEventListener('load', function(){
                $(document).ready(function() {
                    return init();
                });
            }, false);
            return;
        }

        jQuery.noConflict();
        jQuery(document).ready(function($) {
            var hostname = window.location.hostname;
            var pathname = window.location.pathname;
            var referrer = document.referrer;
            var cidFromGet = window.urlVars[cidVariable] || null;
            var keyFromGet = window.urlVars[keyVariable] || '';
            var hostFromGet = window.urlVars[hostVariable] || '';
            var cidFromCookie = getCookie(cidVariable);

            // Get CID from website storage if exists
            if (window.epcid) {
                cidFromCookie = window.epcid;
                cidFromGet = window.epcid;
            }

            if (cidFromGet !== null || cidFromCookie !== null) {
                if (cidFromGet !== null) {
                    setCookie(cidVariable, cidFromGet, 1825, '/');
                    cidFromCookie = cidFromGet;
                }
                $.ajax({
                    url: host,
                    data: {
                        hostname : hostname,
                        pathname : pathname,
                        referrer : referrer,
                        cid : cidFromCookie,
                        se_host: decodeURIComponent(hostFromGet),
                        se_key: decodeURIComponent(keyFromGet),
                        action: 'setVisit'
                    },
                    timeout: 5000,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    error: function(data) {
                        //console.log(data);
                    }
                });
            }

        });
    }

    function clearHash() {
        if(window.location.hash) {
            window.location.hash = '';
        }
    }

    function getUrlVars() {
        var params = {};
        // used for old sites with epcid in location.search
        if(window.location.search) {
            var query = window.location.search.substring(1).split('&');
            for (var i = 0; i < query.length; i++) {
                var getVar = query[i].split('=');
                params[getVar[0]] = typeof(getVar[1]) == 'undefined' ? '' : getVar[1];
            }
        }

        if(window.location.hash) {
            var query = window.location.hash.substring(1).split('&');
            for (var i = 0; i < query.length; i++) {
                var getVar = query[i].split('=');
                params[getVar[0]] = typeof(getVar[1]) == 'undefined' ? '' : getVar[1];
            }
        }
        return params;
    }
    
    function setCookie(name, value, expireDays, path, domain, secure) {
        var cookieString = name + "=" + escape(value);
        if (expireDays) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + expireDays);
            cookieString += "; expires=" + expireDate.toGMTString();
        }
        if (path) cookieString += "; path=" + escape(path);
        if (domain) cookieString += "; domain=" + escape(domain);
        if (secure) cookieString += "; secure";
        document.cookie = cookieString;
    }
    
    function getCookie(cookieName) {
        var results = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
        return (results) ? (unescape(results[2])) : null;
    }
})();
