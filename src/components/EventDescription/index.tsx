import React from "react";
export default function EventDescription(props) {
  const { event, stylec } = props;
  let date1;
  let date2;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (event !== null) {
    const startDate = new Date(event._start.toNumber());
    const month = monthNames[startDate.getMonth()];
    const day = startDate.getDate();
    const year = startDate.getFullYear();
    const hour = startDate.getHours();
    const minute = startDate.getMinutes();
    date1 = month + " " + day.toString() + " " + year.toString();
    date2 =
      (hour / 12 <= 1 ? hour : hour - 12) +
      ":" +
      minute +
      (hour / 12 <= 1 ? "AM" : "PM");
  }

  return event !== null ? (
    <div className={"grid grid-cols-6 items-center mt-4 " + stylec}>
      <div className="col-start-1 col-end-4 text-left">{event._name}</div>
      <div className="col-start-4 col-end-6">{event._description}</div>
      <div className="col-start-7">
        <div className="">{date1}</div>
        <div className="">{date2}</div>
      </div>
    </div>
  ) : null;
}
