jQuery(window).ready(function(){
  // countdown
  if($().countdown && $(".password-countdown").length > 0) {
    var t = new Date(),
        o = new Date(
          parseInt($(".password-countdown").data("year")),
          parseInt($(".password-countdown").data("month")) - 1,
          $(".password-countdown").data("day")
        );
    if(o > t){ 
      $(".password-countdown").countdown({ until: o });
    }
  }
  // 
  $(".newsletter-terms").on("change", function(){
    if ($(".newsletter-terms").prop('checked') == true) {
      $(".button-submit").removeClass("button-disabled");
    } else {
      $(".button-submit").addClass("button-disabled");
    }
  });
 // 
  $(".notice-close").on("click", function(e){
  	$(".header-notice").remove();
  });
});