import React from "react";
import "./LeaderBoard.css";
import { Image } from "@fluentui/react-northstar";

export function Deploy(props: { docsUrl?: string }) {
  const { docsUrl } = {
    docsUrl: "https://aka.ms/teamsfx-docs",
    ...props,
  };
  return (
    <div className="leader page">
      <div className="title">
        <h2>⭐ Leader Board ⭐</h2>
      </div>
      <iframe
        src="https://jeff41101.github.io/LeaderBoard/"
        title="Leader Board"
        name="mainframe"
        id="mainframe"
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="No"
        className="LeaderBoard"
      ></iframe>
    </div>
  );
}
