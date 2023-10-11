import { Interactions } from "aws-amplify";
import "./App.css";
import { Send } from "react-feather";
import { useEffect, useRef, useState } from "react";

interface ContainerProps {
  children: React.ReactNode;
  width?: string;
  className?: string;
}

function App() {
  const [messageHistory, setMessageHistory] = useState<string[]>([
    "Hi! 👋 I'm the FisherDirect Onboarding Assistant. What would you like to learn more about?",
  ]);
  const [loading, setLoading] = useState(false);
  const scrollEnd = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState<string>("");
  // Provide a bot name and user input
  const sendQuestion = async () => {
    if (userInput === "") {
      return;
    }
    setMessageHistory((prev) => [...prev, userInput]);
    setLoading(true);
    setTimeout(async () => {
      let response: any = null;
      try {
        response = await Interactions.send("OrderFlowers_main", userInput);
        setMessageHistory((prev) => [...prev, response?.message]);
      } catch (e) {
        setMessageHistory((prev) => [...prev, "Sorry, something went wrong. Please try again later!"]);
      } finally {
        setLoading(false);
      }
    }, 2000);

    setUserInput("");
  };

  useEffect(() => {
    if (messageHistory.length > 2) {
      scrollEnd?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messageHistory.length]);

  const onChangeHandler = (event: any) => {
    setUserInput(event.target.value);
  };

  const onKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      sendQuestion();
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <Container className="mt-20" width="450px">
          <div className="border-2 rounded-3xl h-[750px] bg-white border-grey-200 shadow-2xl">
            <div className="flex flex-col justify-between content-between h-full">
              <div className="p-5 mt-1">
                {messageHistory.length !== 0 && (
                  <div className="max-h-[600px] overflow-auto">
                    <ChatWindow
                      messageHistory={messageHistory}
                      loading={loading}
                    />
                    <div ref={scrollEnd} />
                  </div>
                )}
              </div>
              <div>
                <hr className="border" />
                <div className="flex justify-center p-5 mt-1">
                  <input
                    type="text"
                    placeholder="Ask me anything..."
                    className="input input-bordered w-full max-w-xs"
                    onChange={onChangeHandler}
                    value={userInput}
                    onKeyDown={onKeydown}
                  />
                  <div className="ml-2">
                    <button
                      className="btn btn-secondary"
                      onClick={sendQuestion}
                    >
                      <Send />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

const Header = () => {
  return (
    <header className="fixed top-0 bg-primary w-full">
      <div className="md:flex md:items-center md:justify-between mx-5 shadow-2xl">
        <div className="min-w-0 flex-1 ">
          <div className="py-4 ">
            <img src="/NSWLogo.png" alt="logo" width="200px" />
          </div>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0 font-semibold text-white text-sm items-center">
          <span>Welcome, Danh.</span>
          <span className="ml-3 font-semibold text-xs underline">Logout</span>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <header className="fixed bottom-0 bg-white w-full">
      <div className="md:flex md:items-center md:justify-between mx-5 shadow-2xl">
        <div className="min-w-0 flex-1 ">
          <div className="py-3 text-xs font-semibold flex items-center">
            <span className="mr-1 w-8">
              {" "}
              <img src="/lex-logo.png" alt="lex-logo" />
            </span>
            Powered by Amazon Lex AI{" "}
          </div>
        </div>
        <div className="mt-3 flex md:ml-4 md:mt-0 text-xs font-semibold">
          Lapis Skills Day 2023
        </div>
      </div>
    </header>
  );
};

const Container = ({
  children,
  width = "62.5rem",
  className = "",
}: ContainerProps) => {
  return (
    <div
      style={{ width }}
      className={`container px-4 lg:px-0 mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

const ChatWindow = ({
  messageHistory,
  loading,
}: {
  messageHistory: string[];
  loading: boolean;
}) => (
  <>
    {messageHistory.map((message, index) => {
      if (index % 2 !== 0) {
        // This is the user
        return (
          <div className="chat chat-end" key={index}>
            <div className="chat-bubble chat-bubble-accent text-white text-end max-w-[250px]">
              {message}
            </div>
          </div>
        );
      } else {
        // This is the bot
        return (
          <div className="chat chat-start" key={index}>
            <div className="chat-image avatar online">
              <div className="w-8 rounded-full">
                <img src="/FisherMobile-logo.png" alt="chatbot-avatar" />
              </div>
            </div>
            <div className="chat-bubble chat-bubble-primary text-start max-w-[250px]">{message}</div>
          </div>
        );
      }
    })}
    {loading && (
      <div className="chat chat-start" key="loading">
        <div className="chat-image avatar online">
          <div className="w-8 rounded-full">
            <img src="/FisherMobile-logo.png" alt="chatbot-avatar" />
          </div>
        </div>
        <div className="chat-bubble chat-bubble-primary">
          <span className="loading loading-dots loading-md"></span>
        </div>
      </div>
    )}
  </>
);

export default App;
