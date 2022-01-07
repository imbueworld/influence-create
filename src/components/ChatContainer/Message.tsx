import React from "react";

export default function Message({ message }) {
  const { username, content } = message;
  return (
    <div className="rounded-xl px-3 py-3 my-2 bg-white">
      <div className="text-xl break-all">{content}</div>
      <p className="text-sm">
        {username.slice(0, 5)}...{username.slice(-4)}
      </p>
    </div>
  );
}
