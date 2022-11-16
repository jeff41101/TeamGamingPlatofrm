import { useContext, useState } from "react";
import { Image, Menu } from "@fluentui/react-northstar";
import "./Welcome.css";
import { EditCode } from "./GamePlay";
import { Graph } from "./Graph";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { Deploy } from "./LeaderBoard";
import { Publish } from "./Publish";
import { TeamsFxContext } from "../Context";

export function Welcome(props: { environment?: string }) {
  const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const steps = ["local", "azure", "publish"];
  const friendlyStepsName: { [key: string]: string } = {
    local: "1.Matching Game 🕹",
    azure: "2. LeaderBoard - Check out the winners 👑",
    publish: "3. Advice & Feedback 💌",
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("local");
  const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });

  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <h1 className="center">Welcome{userName ? ", " + userName : ""}!</h1>
        <p className="center">Are you looking for some fun? ✨✨✨</p>
        <Menu defaultActiveIndex={0} items={items} underlined secondary />
        <div className="sections">
          {selectedMenuItem === "local" && (
            <div>
              <EditCode />
              {/*<CurrentUser userName={userName} />*/}
              {/*<Graph />*/}
            </div>
          )}
          {selectedMenuItem === "azure" && (
            <div>
              <Deploy />
            </div>
          )}
          {selectedMenuItem === "publish" && (
            <div>
              <Publish />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
