import React from "react";

export default function Message({ message, received }) {
  const { username, content } = message;
  const margin = received ? "mr-6" : "ml-6";
  return (
    <div className={"rounded-xl px-3 py-3 my-2 bg-white " + margin}>
      <div className="text-xl break-all">{content}</div>
      <p className="text-sm">
        {username.slice(0, 5)}...{username.slice(-4)}
      </p>
    </div>
  );
}
