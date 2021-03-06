import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  UserGroupIcon,
  BookmarkIcon,
  XIcon,
} from "@heroicons/react/outline";

import AuthWrapper from "../components/AuthWrapper.jsx";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Communities", href: "#", icon: UserGroupIcon, current: false },
  { name: "Messages", href: "#", icon: CalendarIcon, current: false },
  { name: "Timeline", href: "#", icon: SearchCircleIcon, current: false },
  { name: "Bookmark", href: "#", icon: BookmarkIcon, current: false },
  { name: "Settings", href: "#", icon: MapIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const signOut = (auth) => auth.signOut().then(() => console.log("signed out"));
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useAuth();

  return (
    <AuthWrapper>
      <div className="h-screen">
        <div className="h-full flex">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-shrink-0 flex items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://uploads-ssl.webflow.com/62ba867be08029af251ae3f3/62ba88085e24a6899089f331_charleyai-p-800.png"
                        alt="Workflow"
                      />
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <a href="#" className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={auth.currentUser?.photoURL}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            {auth.currentUser?.displayName}
                          </p>
                          <button
                            onClick={() => {
                              auth.signOut();
                            }}
                            className="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                          >
                            Log out
                          </button>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto bg-white m-4 rounded-xl">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://uploads-ssl.webflow.com/62ba867be08029af251ae3f3/62ba88085e24a6899089f331_charleyai-p-800.png"
                      alt="Workflow"
                    />
                  </div>
                  <nav className="mt-5 flex-1" aria-label="Sidebar">
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? "text-blue-500" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500",
                              "mr-3 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <a href="#" className="flex-shrink-0 w-full group block">
                    <div className="flex items-center">
                      <div>
                        <img className="inline-block h-9 w-9 rounded-full" src={auth.currentUser?.photoURL} alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {auth.currentUser?.displayName}
                        </p>
                        <button
                          onClick={() => {
                            auth.signOut();
                          }}
                          className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="lg:hidden">
              <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://uploads-ssl.webflow.com/62ba867be08029af251ae3f3/62ba88085e24a6899089f331_charleyai-p-800.png"
                    alt="Charley"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 relative z-0 flex overflow-hidden">
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                {/* Start main area*/}
                <Home />
                {/* End main area */}
              </main>
              <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200 overflow-y-auto">
                {/* Start secondary column (hidden on smaller screens) */}
                <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                  <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" />
                </div>
                {/* End secondary column */}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

import Head from "next/head";
import { useEffect, useRef } from "react";
import Conversation from "../components/Conversation.jsx";
import { doc, getDoc } from "firebase/firestore";

import { fetchPostJSON } from "../lib/api-helpers.js";
import { useAuth, useFirestore } from "reactfire";

function Home() {
  const prompt = useRef();
  const [conversation, setConversation] = useState([]);
  const [text, setText] = useState("");

  const { currentUser } = useAuth();

  const firestore = useFirestore();

  useEffect(() => {
    async function getUserData(currentUser) {
      // prompt.current = `ALS is a tutor chatbot that ask it's student what topic they want to learn and teach them. ALS intelligently answers questions with engaging responses and facts, his student name is ${
      //   currentUser.displayName
      // }.\n\nBegin the lesson!\n\nALS: Welcome to the session ${currentUser.displayName}.\nStudent: Thanks.\n\nALS:`;
      prompt.current = `Charley is an AI Powered study tool and tutor chatbot that helps students learn in a style that's unique to them. Charley adapts to their needs, abilities, goals, and proficiencies, which results in an effective delivery of material and information. Charley creates and delivers lessons based on what they want to learn (will ask what they want to learn at the start of a session). Charley engages the student by asking questions as often as possible and by providing engaging responses. Depending on language proficiency, Charley will go more in-depth with responses (high proficiency) or give explanations and use shorter and more simple words (low proficiency), and everywhere in between. Charley will develop a personal relationship over time, and address the student by their name. Charley will always provide responses that cover the topic, so there should never be responses that lead into something else. All responses should cover enough information on the topic, and allow the student to give a response without it being awkward.\n\nStudent Name: ${currentUser.displayName}\nLanguage Proficiency: very low\nEducation: completed high school\n--------------\nCharley: Welcome to the session.\nStudent: Thanks.\nCharley:`;
      fetchPostJSON("/api/generate", { prompt: prompt.current })
        .then((res) => {
          console.log(res);
          setConversation((prevArr) => [
            ...prevArr,
            {
              name: "Charley AI",
              text: res[0].text,
            },
          ]);
          prompt.current += res[0].text;
          console.log(prompt.current);
        })
        .catch((e) => console.log(e));
    }
    if (currentUser) {
      getUserData(currentUser);
    }
  }, [firestore, currentUser]);

  useEffect(() => {
    executeScroll();
  }, [conversation]);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollTo(0, myRef.current.scrollHeight);
  return (
    <div className="h-full p-4 flex flex-col items-stretch">
      <Head>
        <title>Charley.ai</title>
        <meta name="description" content="AI powered learning platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
        role="alert"
      >
        <span className="font-medium">You are interacting an AI.</span> Please be polite.
      </div>

      <div ref={myRef} className="flex-1 flex overflow-auto">
        <Conversation conversation={conversation} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text) return;
          setConversation((prevArr) => [
            ...prevArr,
            {
              id: prevArr.length + 1,
              name: "You",
              text: text,
            },
          ]);

          prompt.current += "\nStudent:" + text + "\nCharley:";

          fetchPostJSON("/api/generate", {
            prompt: prompt.current,
          }).then((res) => {
            setConversation((prevArr) => [
              ...prevArr,
              {
                name: "Charley AI",
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
            autoComplete="off"
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
  );
}
