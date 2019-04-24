module.exports = {
  splitDate: function(date){
    let d = date.split("-").join("");
   	return d;
  },
  newRow: function(index) {
  	if (index % 3 == 0) {
  		return true;
  	}
  	return false;
  },
  closeRow: function(index) {
  	if ((index +1) % 3 == 0) {
  		return true;
  	}
  },
  hasQuote: function(q) {
    if (q == " " || q.length == 0) {
      return false;
    }
    return true;
  },
// prettyDate src @wolthers https://gist.github.com/wolthers/9227398
  prettyDate: function (ts) {
    timestamp = new Date(ts).getTime() / 1000;
    var date,
    monthNames,
    secs = ((new Date()).getTime() / 1000) - timestamp,
    minutes = secs / 60,
    hours = minutes / 60,
    days = hours / 24,
    weeks = days / 7,
    months = weeks / 4.34812,
    years = months / 12;
    
    if (minutes < 1) {
      secs = Math.floor(secs % 60);
        return secs + (secs > 1 ? " seconds ago" : " second ago");
    }
    if (hours < 1) {
      hours = Math.floor(minutes % 60);
        return hours + (minutes > 1 ? " minutes ago" : " minute ago");
    }
    if (days < 1) {
      hours = Math.floor(hours % 24);
        return hours + (hours > 1 ? " hours ago" : " hour ago");
    }
    else if (days < 4) {
      days = Math.floor(days % 7);
      return days + (days > 1 ? " days ago" : " day ago");
    }
    else {
      date = new Date(timestamp * 1000);
      monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
      return monthNames[date.getMonth()] + " " + date.getDate();
    }   
  }
}

/**
  @param {UNIX timestamp} timestamp - an unix timestamp in seconds
*/
