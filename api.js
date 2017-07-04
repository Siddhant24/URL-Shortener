'use strict';

module.exports = {
  
  generateHash : function (url, collection){
    var hashList = [];
    var hash = '';
    collection.find().toArray(function(err, data){
      if(err){
        console.log('Error in finding hashlist in collection.Error:', err);
      }
      else{
        hashList = data.map(val => val.hash);
      }
    });
    do{
        hash = String.fromCharCode(97 + Math.random()*26) + Math.round(1000 + Math.random()*1000).toString();
      }while(hashList.indexOf(hash) != -1);
    return hash;
  },
  
  save: function (shorturl, collection){
    collection.save(shorturl, function(err, data){
      if(err){
        console.log('Error: Not able to save in database.Error:',err);
      }
    })
  },
  
  validateURL: function (url) {
    // Regex from https://gist.github.com/dperini/729294
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
  }
}