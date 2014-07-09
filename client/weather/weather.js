function kelToFahr(temp) {
  var fahrehneit = Math.round(9 / 5 * (temp-273) + 32);
  return fahrehneit;
};

Template.weather.curweather = function() {
  var city = Session.get('city');
  Meteor.call('getWeather', city, function(err, results){
    Session.set('temperature', JSON.parse(results.content).main["temp"])
    Session.set('weather', JSON.parse(results.content).weather[0].description);
    Session.set('windspeed', JSON.parse(results.content).wind["speed"])
  });
  console.log(Session.get('weather'));
  var temp = kelToFahr(Session.get('temperature'));
  console.log(temp);
  return (Session.get('weather') + ',  windspeed is ' + Session.get('windspeed') + ' mph and temperature is ' + temp + ' degrees in ' + city).toUpperCase();
};

Template.weather.events({
  'change .cities':function(evt,tmpl) {
    Session.set('city', tmpl.find('.cities').value)
  }
})