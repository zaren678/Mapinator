$(document).ready(function() {
   horloge();
   xplanet();
});

/* horloge */

var horloge_timeout;

function horloge()
{
  dows  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  mois  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  now          = new Date;
  heure        = now.getHours();
  min          = now.getMinutes();
  sec          = now.getSeconds();
  jour_semaine = dows[now.getDay()];
  jour         = now.getDate();
  mois         = mois[now.getMonth()];
  annee        = now.getFullYear();


  if (sec < 10){sec0 = "0";}else{sec0 = "";}
  if (min < 10){min0 = "0";}else{min0 = "";}
  if (heure < 10){heure0 = "0";}else{heure0 = "";}
  ampm = (heure <= 11) ? "AM":"PM"
  if (heure > 12){heure = heure - 12;}
  else if (heure === 0) {heure = 12;}

  horloge_content = heure + ":" + min0 + min + " " + ampm + " MST ~ " + jour_semaine + " ~ " + mois + " " + jour + "," + " " + annee;

  $("#horloge").html(horloge_content);

  horloge_timeout = setTimeout("horloge()", 1000);
}

/* xplanet */

var xplanet_timeout;

function xplanet () {

  var now       = new Date().getTime();
  var img_earth = $("<img />").attr("src", "xplanet/img/xplanet_earth.png?"+now);
  var img_moon  = $("<img />").attr("src", "xplanet/img/xplanet_moon.png?"+now);

  $("#img_earth").attr("src", "xplanet/img/xplanet_earth.png?"+now);
  $("#img_moon").attr("src", "xplanet/img/xplanet_moon.png?"+now);

  xplanet_timeout = setTimeout("xplanet()", 120000);
}



