import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Conversation from "../components/Conversation.jsx";

import { fetchPostJSON } from "../lib/api-helpers.js";

const initialPrompt =
  '"student profile" = information on the student to change how you teach them.\n"learning topic" = the topic that\'s being taught.\n"Student name" = how to address them\n"English proficiency" = their level of proficiency in English\nNote: Don\'t respond on behalf of the student\nNote: After the student responds (Student:), respond to them.\nNote: End every ALS sentence with a question to engage the student.\nExample Layout:\nALS: Hello.\nStudent: Hi.\nALS: Welcome to the session.\nStudent: Thanks.\n--------------\nStudent Profile: high school student\nStudent Name: Jasper\nEnglish Proficiency: 2nd grader\nLearning Topic: Napoleon\nList the most important things that a student should learn if they want to understand the learning topic:\n\n-What Napoleon Bonaparte did during his lifetime\n-The effects of Napoleon\'s actions on Europe and the world\n-How people today view Napoleon and his legacy\n\nBegin the lesson!\n\nALS:';

export default function Home() {
  const prompt = useRef(initialPrompt);
  const [conversation, setConversation] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(prompt.current);
    fetchPostJSON("/api/generate", { prompt: prompt.current })
      .then((res) => {
        console.log(res);
        setConversation((prevArr) => [
          ...prevArr,
          {
            name: "Earlo AI",
            text: res[0].text,
          },
        ]);
        prompt.current += res[0].text;
        console.log(prompt.current);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="h-screen p-4">
      <Head>
        <title>Earlo.ai</title>
        <meta name="description" content="AI powered learning platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-lg mx-auto h-full flex flex-col rounded shadow-xl overflow-hidden">
        <div className="bg-black text-white rounded-t p-4 ">
          <h2 className="text-3xl">Hi Salim 👋</h2>
          <h4 className="text-gray-500">Start a conversation</h4>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col-reverse h-full overflow-y-auto">
            <Conversation conversation={conversation} />
          </div>
          <div className="">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConversation((prevArr) => [
                  ...prevArr,
                  {
                    id: prevArr.length + 1,
                    name: "You",
                    text: text,
                  },
                ]);

                prompt.current += "\nStudent:" + text + "\nALS:";

                fetchPostJSON("/api/generate", {
                  prompt: prompt.current,
                }).then((res) => {
                  setConversation((prevArr) => [
                    ...prevArr,
                    {
                      name: "Earlo AI",
                      text: res[0].text,
                    },
                  ]);
                  prompt.current += res[0].text;
                  console.log(prompt.current);
                });
                setText("");
              }}
            >
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg ">
                <input
                  id="chat"
                  name="text"
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Your message..."
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                  }}
                ></input>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
                >
                  <svg
                    className="w-6 h-6 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
