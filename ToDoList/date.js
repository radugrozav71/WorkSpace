
exports.getDate = function (){

  const today = new Date();
  const options = {
    weekday: "long",
    day:"numeric",
    month:"long"
  };

  return today.toLocaleDateString("en-ro", options);

};

exports.getDay = function(){

  let today = new Date();
  const options = {
    weekday: "long",
  };
  
  return today.toLocaleDateString("en-ro", options);
};
