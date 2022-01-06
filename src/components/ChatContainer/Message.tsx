import React from "react";

export default function Message({ key, message }) {
  const { username, content } = message;
  return (
    <div className="rounded-xl px-3 py-3 my-2 bg-white">
      <div className="text-xl">{content}</div>
      <p className="text-sm">{username}</p>
    </div>
  );
}
