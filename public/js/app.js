(function($){
  // get the base location
  if (!window.location.origin){
    window.location.origin = window.location.protocol+"//"+window.location.host;
  }
  // DOM ready
  $(function(){
    var shrtr = $("#shrtr"),
        spin = $("<img />").attr("src", "/img/spinner.gif");
    // progress indicator
    shrtr.append(spin);
    spin.hide();
    
    // templates using {{ }} as delimiters
    _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
    var displayTemplate = _.template($("#shrtr-display-template").html());
    var formTemplate = _.template($("#shrtr-form-template").html());

    // Form
    window.shrtrFormSubmit = function(){
      $("#shrtr-url-form").hide();
      spin.show();
      var url = $("input:first").val();
      $.post("/shrtn", {url: url}, function(data){
        spin.hide();
        if(data.error === "Error") {
          shrtr.append(displayTemplate({
            urlOne: "System Error, try again later",
            urlTwo: ""
          }));
          return;
        }
        shrtr.append(displayTemplate({
          urlOne: url,
          urlTwo:  window.location.origin + "/" + data.surl
        }));
      });
      return true;
    };
    
    
    // we want to extned an url so display resolved and redirect
    if(window.shrtrSurl !== "false") {
      spin.show();
      $.post("/extn", { surl: window.shrtrSurl }, function(data){
        var surl = window.location.origin + "/" + window.shrtrSurl;
        spin.hide();
        if(data.error === "Error") {
          shrtr.append(displayTemplate({
            urlOne: surl,
            urlTwo: "System Error, try again later"
          }));
          return;
        }
        if(data.error === "Not found") {
          shrtr.append(displayTemplate({
            urlOne: surl,
            urlTwo: "Not found"
          }));
          return;
        }
        shrtr.append(displayTemplate({
          urlOne: surl,
          urlTwo: "Redirecting in 3sec " + data.url
        }));
        setTimeout(function() {
          window.location = data.url;
        }, 3000);
      });
    } else {
    // display form to shorten Url
      shrtr.append(formTemplate());
    }
  });
  
})(jQuery);