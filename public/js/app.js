(function($){
  // DOM ready
  $(function(){
    var shrtr = $("#shrtr"),
        spinner = $("img").attr("src", "/img/spinner.gif");
    shrtr.append(spinner);
    spinner.hide();
    // we want to extned an url so display resolved and redirect
    if(window.shrtrSurl) {
      spinner.show();
      $.post("/extn", window.shrtrSurl, function(data){
        spinner.hide();
        shrtr.html(data["url"]);
      });
    } else {
      
    }
  });
  
})(jQuery);