import { TeamsFx } from "@microsoft/teamsfx";
import React, { useContext } from "react";
import { TeamsFxContext } from "../Context";
import { useData } from "@microsoft/teamsfx-react";
import * as $ from "jquery";
import {
  Button,
  CardFooter,
  CardHeader,
  CardBody,
  Card,
  Flex,
  Text,
} from "@fluentui/react-northstar";

export function EditCode(props: { tabCodeEntry?: string }) {
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;
  const { tabCodeEntry } = {
    tabCodeEntry: "tabs/src/index.tsx",
    ...props,
  };

  // Send Data to DynamoDB
  window.addEventListener("message", (event) => {
    // IMPORTANT: check the origin of the data!
    console.log("event origin =" + event.origin);
    if (event.origin === "https://jeff41101.github.io") {
      // The data was sent from your site.
      // Data sent with postMessage is stored in event.data:

      const userName = loading || error ? "" : data!.displayName;
      var u = userName;
      console.log(u);
      //if (event.data.moves) {
      var settings = {
        url: "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/PostScore",
        method: "POST",
        timeout: 0,
        headers: {
          Accept: "application/json",
          "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          Trials: event.data.moves,
          Time: event.data.time,
          UserName: u,
        }),
      };
      $.ajax(settings).done(function (response) {
        console.log("response = " + response);
      });
      //}
      // else {
      //   var settings = {
      //     url: "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/TriviaPost",
      //     method: "POST",
      //     timeout: 0,
      //     headers: {
      //       Accept: "application/json",
      //       "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
      //       "Content-Type": "application/json",
      //     },
      //     data: JSON.stringify({
      //       Trials: event.data,
      //       UserName: u,
      //     }),
      //   };

      //   $.ajax(settings).done(function (response) {
      //     console.log("response = " + response);
      //   });
      // }
    } else {
      // The data was NOT sent from your site!
      // Be careful! Do not use it. This else branch is
      // here just for clarity, you usually shouldn't need it.
      console.log("call failed");
      return;
    }
  });

  return (
    <div>
      <h2 className="title">🧠 Matching-Game 🧠</h2>
      <p>
        <b>Intructions: </b>
        Let's see how good you are {userName ? userName : ""} matching the same
        products from <b>MOXA</b>
      </p>
      <Button
        primary
        fluid
        content="Start Playing"
        onClick={() => {
          let iframe = document.getElementById("mainframe");
          iframe?.setAttribute("height", "100%");
        }}
      />

      {/* <h2 className="title">⏰ Trivia-Game ⏰</h2>
      <p>
        <b>Intructions: </b>
        Let's see how good you are {userName ? userName : ""} knowing{" "}
        <b>MOXA</b>
      </p>

      <Button
        primary
        fluid
        content="Start Playing"
        onClick={() => {
          let iframe = document.getElementById("mainframe1");
          iframe?.setAttribute("height", "100%");
        }}
      />
      <iframe
        src="https://jeff41101.github.io/QuizMaster/"
        title="Quiz Game"
        name="mainframe1"
        id="mainframe1"
        width="120%"
        height="0%"
        frameBorder="0"
        scrolling="No"
      ></iframe> */}
      <iframe
        src="https://jeff41101.github.io/Memory-Matching-Game/"
        title="Memory Game"
        name="mainframe"
        id="mainframe"
        width="120%"
        height="0%"
        frameBorder="0"
        scrolling="No"
      ></iframe>
    </div>
  );
}
