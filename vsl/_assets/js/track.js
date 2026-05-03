(function(){
  try{
    var params = new URLSearchParams(window.location.search);
    if(!params.toString()) return;
    document.querySelectorAll('a[href]').forEach(function(a){
      var href=a.getAttribute('href');
      if(!href || href.indexOf('#')===0 || href.indexOf('mailto:')===0 || href.indexOf('tel:')===0) return;
      try{
        var url=new URL(href, window.location.href);
        params.forEach(function(v,k){ if(!url.searchParams.has(k)) url.searchParams.set(k,v); });
        a.setAttribute('href', url.toString());
      }catch(e){}
    });
  }catch(e){}
})();
