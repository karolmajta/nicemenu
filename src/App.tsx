import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import styled from "styled-components";

import MenuRaw from "./components/Menu";
import Backdrop from "./components/Backdrop";
import WindowContext from "./contexts/WindowContext";

const Menu = styled(MenuRaw)`
  width: 600px;
  margin-top: 100px;
`;

const DebugMessage = styled.div`
  font-family: Inter;
  margin-top: 150px;

  .help-message {
    margin-bottom: 24px;
    font-size: 12px;
    letter-spacing: 1.5px;
    text-align: center;
  }

  .log-message {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
`;

function App() {
  const window = useContext(WindowContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [logMessage, setLogMessage] = useState("");

  const timeout = useRef<number | null>(null);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setMenuVisible(true);
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [window]);

  const log = useCallback(
    (message: string) => {
      window.clearTimeout(timeout.current || undefined);
      setLogMessage(message);
      setMenuVisible(false);
      timeout.current = window.setTimeout(() => setLogMessage(""), 5000);
    },
    [setLogMessage, setMenuVisible, timeout, window]
  );

  return (
    <>
      <DebugMessage>
        <div className="help-message">Press space to open the menu...</div>
        <div className="log-message">{logMessage}</div>
      </DebugMessage>
      {menuVisible && (
        <Backdrop onDismiss={() => setMenuVisible(false)}>
          <Menu
            title="Main menu"
            items={[
              {
                icon: "bolt",
                label: "Log an activity",
                shortcut: [["c"]],
                onSelect: () => log("Log an activity"),
              },
              {
                icon: "reschedule",
                label: "Set a reminder",
                shortcut: [["h"]],
                onSelect: () => log("Set a reminder"),
              },
              {
                icon: "loader",
                label: "Change status",
                shortcut: [["Shift", "s"]],
                onSelect: () => log("Change status"),
              },
              {
                icon: "pencil",
                label: "Edit contact",
                shortcut: [["e"]],
                onSelect: () => log("Edit contact"),
              },
            ]}
            groups={[
              {
                label: "Go to...",
                items: [
                  {
                    icon: "inbox",
                    label: "Go to inbox",
                    shortcut: [["g"], ["i"]],
                    goto: "inbox",
                  },
                  {
                    icon: "dot",
                    label: "Go to focus",
                    shortcut: [["g"], ["f"]],
                    goto: "focus",
                  },
                ],
              },
            ]}
            submenus={{
              inbox: {
                title: "Inbox",
                items: [
                  {
                    label: "This is not spam!",
                    onSelect: () => log("Read: This is not spam!"),
                  },
                  {
                    label: "Remember to hire Karol.",
                    onSelect: () => log("Read: Remember to hire Karol."),
                  },
                  {
                    label: "Hey, how is it going?",
                    onSelect: () => log("Read: Hey, how is it going?"),
                  },
                ],
                groups: [
                  {
                    label: "Mail actions...",
                    items: [
                      {
                        icon: "pencil",
                        label: "Create new message",
                        shortcut: [["m"]],
                        onSelect: () => log("Create new message"),
                      },
                      {
                        icon: "reschedule",
                        label: "Check for new mail",
                        shortcut: [["r"]],
                        onSelect: () => log("Check for new mail"),
                      },
                    ],
                  },
                  {
                    label: "Go to...",
                    items: [
                      {
                        icon: "dot",
                        label: "Go to focus",
                        shortcut: [["g"], ["f"]],
                        goto: "../focus",
                      },
                      {
                        label: "Go to main menu",
                        shortcut: [["g"], ["m"]],
                        goto: "..",
                      },
                    ],
                  },
                ],
              },
              focus: {
                title: "Focus",
                items: [
                  {
                    icon: "bolt",
                    label: "Focus on productivity",
                    shortcut: [["f"], ["p"]],
                    onSelect: () => log("Focus: On productivity."),
                  },
                  {
                    icon: "bolt",
                    label: "Focus on work life balance",
                    shortcut: [["f"], ["w", "l"], ["b"]],
                    onSelect: () => log("Focus: On work life balance."),
                  },
                  {
                    icon: "bolt",
                    label: "Focus on quality",
                    shortcut: [["f"], ["q"]],
                    onSelect: () => log("Focus: On quality."),
                  },
                ],
                groups: [
                  {
                    label: "Go to...",
                    items: [
                      {
                        icon: "inbox",
                        label: "Go to inbox",
                        shortcut: [["g"], ["f"]],
                        goto: "../inbox",
                      },
                      {
                        label: "Go to main menu",
                        shortcut: [["g"], ["m"]],
                        goto: "..",
                      },
                    ],
                  },
                ],
              },
            }}
          />
        </Backdrop>
      )}
    </>
  );
}

export default App;
