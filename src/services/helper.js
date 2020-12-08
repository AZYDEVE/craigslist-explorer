import * as moment from "moment";
var Color = require("color");

export const convertDateToFromNow = (date) => {
  return moment(date).fromNow();
};

export const convertDate = (date) => {
  return moment(date).format("MMM d");
};

export const getRandomBackgroundColor = (str) => {
  var saturation = 0;
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    const _charCode = str.charCodeAt(i);
    saturation = (saturation + _charCode) % 100;
    hash = _charCode + ((hash << 5) - hash);
  }

  var light = (saturation * saturation) % 100;

  var hue = hash % 360;

  const color = Color("hsl(" + hue + ", " + saturation + "%, " + light + "%)");

  const style = {
    backgroundColor: color.rgb(),
    color: color.isDark() ? "white" : "black",
  };
  return style;
};
