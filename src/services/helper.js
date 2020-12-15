import * as moment from "moment";

export const convertDate = (date) => {
  return moment(date).format("MMM D");
};
