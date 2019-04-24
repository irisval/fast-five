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
  }
}

