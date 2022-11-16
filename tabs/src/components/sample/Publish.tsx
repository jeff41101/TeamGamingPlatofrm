import {
  Button,
  CardFooter,
  CardHeader,
  CardBody,
  Card,
  Flex,
  Text,
} from "@fluentui/react-northstar";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./Publish.css";
import axios from "axios";
import { TeamsFxContext } from "../Context";
import { useData } from "@microsoft/teamsfx-react";

export function Publish(props: { docsUrl?: string }) {
  const { docsUrl } = {
    docsUrl: "https://aka.ms/teamsfx-docs",
    ...props,
  };
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;
  var u = userName;
  console.log(u);
  const inputRef = useRef(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  //const arrLists = getAllEmp;

  var g = "1";
  var g2 = "2";
  var g3 = "3";
  var Content = ":";
  let lists2: JSX.Element[] = [];

  const [message, setMessage] = useState("");

  const handleMessageChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // 👇️ access textarea value
    setMessage(event.target.value);
    //console.log(event.target.value);
  };

  var sendgiveback = () => {
    const crosURL = "https://cors-anywhere.herokuapp.com/";
    const API_URL =
      "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/postgiveback";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    console.log(message);
    axios
      .post(
        `${API_URL}`,
        {
          Content: `${message}`,
          UserName: `${u}`,
        },
        config
      )
      .then(
        (res) => {
          console.log(res);
          querygiveback();
          alert("Thanks For Your Feebback !");
          setMessage("");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  var querygiveback = () => {
    const crosURL = "https://cors-anywhere.herokuapp.com/";
    const API_URL =
      "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/GetGiveBack";
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios.post(`${API_URL}`, { data: {} }, config).then(
      (res) => {
        console.log(res.data);
        g =
          res.data[0]["UserName"].toString() +
          " : " +
          res.data[0]["Content"].toString();
        g2 =
          res.data[1]["UserName"].toString() +
          " : " +
          res.data[1]["Content"].toString();
        g3 =
          res.data[2]["UserName"].toString() +
          " : " +
          res.data[2]["Content"].toString();
        var gg1 = document.getElementById("gg1");
        if (gg1 != null) {
          gg1.innerHTML = `${g}`;
        }
        var gg2 = document.getElementById("gg2");
        if (gg2 != null) {
          gg2.innerHTML = `${g2}`;
        }
        var gg3 = document.getElementById("gg3");
        if (gg3 != null) {
          gg3.innerHTML = `${g3}`;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    querygiveback();
  });

  return (
    <div className="feedback page">
      <h2 className="title">🌞 Give us some feedback 🌞</h2>
      <Card
        aria-roledescription="card avatar"
        elevated
        inverted
        styles={{ height: "200px", width: "100%" }}
      >
        <Flex gap="gap.small" column fill vAlign="stretch" space="between">
          <CardHeader>
            <Text
              content="Show us some love & passion"
              weight="bold"
              size="large"
            />
          </CardHeader>
          <CardBody>
            <form id="form1">
              <textarea
                ref={inputRef}
                className="textbox"
                id="message"
                name="message"
                value={message}
                onChange={handleMessageChange}
              />
            </form>
          </CardBody>
          <CardFooter fitted={true}>
            <Button primary fluid content="Submit" onClick={sendgiveback} />
          </CardFooter>
        </Flex>
      </Card>
      <div className="feedback page" id="divv">
        <div className="givebackdiv">
          <h2 className="givebackh2" id="gg1"></h2>
        </div>
        <div className="givebackdiv">
          <h2 className="givebackh2" id="gg2"></h2>
        </div>
        <div className="givebackdiv">
          <h2 className="givebackh2" id="gg3"></h2>
        </div>
      </div>
    </div>
  );
}
