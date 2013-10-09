// Setup your partner campaign id "epcid" sitewide
window.epcid = undefined;

(function(){
    var ns = document.createElement('script');
    ns.type = 'text/javascript';
    ns.src = '/visits.js?_=' + Math.random();
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ns, s);
})();
