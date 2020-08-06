function fbSDKLoaded(){

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}
