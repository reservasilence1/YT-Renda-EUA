
(function(){
  try {
    var key = '15c40aadbb8d492da6a950e355ab5807';
    var host = (window.location.hostname||'').toLowerCase();
    var path = (window.location.pathname||'') + (window.location.search||'');
    var beaconUrl = 'https://api.smashads.com.br/api/anticlone/beacon' + '?k=' + encodeURIComponent(key);
    var rulesUrl = 'https://api.smashads.com.br/api/anticlone/rules-by-key' + '?k=' + encodeURIComponent(key);
    var configUrl = 'https://api.smashads.com.br/api/anticlone/config-by-key' + '?k=' + encodeURIComponent(key);

    var applyProtections = function(conf){
      try {
        if (conf && conf.block_right_click) {
          document.addEventListener('contextmenu', function(e){ e.preventDefault(); }, true);
        }
        if (conf && conf.block_devtools) {
          document.addEventListener('keydown', function(e){
            var k = e.key || '';
            if (e.keyCode===123 || (e.ctrlKey && e.shiftKey && (k==='I'||k==='i'||k==='J'||k==='j'||k==='C'||k==='c')) || (e.ctrlKey && (k==='U'||k==='u'))) {
              e.preventDefault(); e.stopPropagation(); return false;
            }
          }, true);
          var _devtools = function(){
            var start = performance.now();
            debugger;
            var diff = performance.now() - start;
            if (diff > 100) { try { document.body.innerHTML=''; } catch(_e){} }
            setTimeout(_devtools, 1500);
          };
          setTimeout(_devtools, 1500);
        }
      } catch(_e){}
    };

    var sendBeacon = function() {
      try {
        var data = new URLSearchParams();
        data.append('k', key);
        data.append('d', host);
        data.append('p', path);
        navigator.sendBeacon && navigator.sendBeacon(beaconUrl, data) || fetch(beaconUrl, {method:'POST', body:data, credentials:'omit'});
      } catch(e){}
    };
    sendBeacon();

    fetch(configUrl, {credentials:'omit'})
      .then(function(r){return r.json();})
      .then(function(conf){ applyProtections(conf||{}); })
      .catch(function(){});

    var applyRules = function(rules) {
      if (!rules || !rules.length) return;
      var rule = rules.find(function(r){return r.enabled && r.target_domain && r.target_domain.toLowerCase()===host;}) ||
                 rules.find(function(r){return r.enabled && !r.target_domain;});
      if (!rule) return;
      if (rule.action_replace_body && rule.media_url) {
        var s = document.createElement('style');
        s.textContent = 'html,body{margin:0;padding:0;height:100%} body{display:flex;align-items:center;justify-content:center;background:#000} img,video{max-width:100%;max-height:100%}';
        document.documentElement.appendChild(s);
        var src = rule.media_url;
        var isVideo = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);
        var el = isVideo ? document.createElement('video') : document.createElement('img');
        if (isVideo) { el.src = src; el.controls = true; el.playsInline = true; } else { el.src = src; }
        document.body.innerHTML = '';
        document.body.appendChild(el);
      }
      if (rule.checkout_url) {
        var as = document.querySelectorAll('a[href]');
        for (var i=0;i<as.length;i++) { as[i].setAttribute('href', rule.checkout_url); }
      }
    };

    fetch(rulesUrl, {credentials:'omit'})
      .then(function(r){return r.json();})
      .then(function(data){ applyRules(data.rules||[]); })
      .catch(function(){});
  } catch(e) {}
})();
	