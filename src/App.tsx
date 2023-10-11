import { Interactions } from "aws-amplify";
import "./App.css";
import { Send } from "react-feather";
import { useState } from "react";

function App() {
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  // Provide a bot name and user input
  const sendQuestion = async () => {
    if (userInput === "") {
      return;
    }
    const response = await Interactions.send("OrderFlowers_main", userInput);
    setMessageHistory((prev) => [...prev, userInput, response.message]);
    setUserInput("");
  };

  const onChangeHandler = (event: any) => {
    setUserInput(event.target.value);
  };

  // Log chatbot response

  return (
    <div className="App">
      <div className="writer">
        <h1 className="text-3xl font-bold underline m-8 p-4 writer-text">
          Hi! 👋 I'm the FisherDirect Assistant
        </h1>
      </div>
      <CenteredOneColumn className="mt-20">
        <CenteredOneColumn width="30rem" className="mb-20">
          {messageHistory.length !== 0 && (
            <ChatBlob messageHistory={messageHistory} />
          )}
        </CenteredOneColumn>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="input input-bordered w-full max-w-xs"
            onChange={onChangeHandler}
            value={userInput}
          />
          <div className="ml-2">
            <button className="btn" onClick={sendQuestion}>
              <Send />
            </button>
          </div>
        </div>
      </CenteredOneColumn>
    </div>
  );
}

interface CenteredOneColumnProps {
  children: React.ReactNode;
  width?: string;
  className?: string;
}

export const CenteredOneColumn = ({
  children,
  width = "62.5rem",
  className = "",
}: CenteredOneColumnProps) => {
  return (
    <div
      style={{ maxWidth: width }}
      className={`container px-4 lg:px-0 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

const ChatBlob = ({ messageHistory }: { messageHistory: string[] }) => (
  <>
    {messageHistory.map((message, index) => {
      if (index % 2 === 0) {
        return (
          <div className="chat chat-end" key={index}>
            <div className="chat-bubble chat-bubble-primary">{message}</div>
          </div>
        );
      } else {
        return (
          <div className="chat chat-start" key={index}>
            <div className="chat-bubble chat-bubble-secondary">{message}</div>
          </div>
        );
      }
    })}
  </>
);

export default App;
