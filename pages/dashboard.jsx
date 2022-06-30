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

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen">
      <div className="h-full flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
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
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
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
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
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
                          src="/images/shea_profile.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          Shea Sheikh
                        </p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          View profile
                        </p>
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
                          item.current
                            ? "text-blue-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-blue-500"
                              : "text-gray-400 group-hover:text-gray-500",
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
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="/images/shea_profile.jpg"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Shea Sheikh
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
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
  );
}

import Head from "next/head";
import { useEffect, useRef } from "react";
import Conversation from "../components/Conversation.jsx";

import { fetchPostJSON } from "../lib/api-helpers.js";

const initialPrompt =
'"student profile" = information on the student to change how you teach them.\n"learning topic" = the topic that\'s being taught.\n"Student name" = how to address them\n"English proficiency" = their level of proficiency in English\nNote: Don\'t respond on behalf of the student\nNote: After the student responds (Student:), respond to them.\nNote: End every ALS sentence with a question to engage the student.\nExample Layout:\nALS: Hello.\nStudent: Hi.\nALS: Welcome to the session.\nStudent: Thanks.\n--------------\nStudent Profile: high school student\nStudent Name: Jasper\nEnglish Proficiency: 2nd grader\nLearning Topic: Napoleon\nList the most important things that a student should learn if they want to understand the learning topic:\n\n-What Napoleon Bonaparte did during his lifetime\n-The effects of Napoleon\'s actions on Europe and the world\n-How people today view Napoleon and his legacy\n\nBegin the lesson!\n\nALS:';

function Home() {
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

  useEffect(() => {
    executeScroll();
  }, [conversation]);

  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollTo(0, myRef.current.scrollHeight);
  return (
    <div className="h-full p-4 flex flex-col items-stretch">
      <Head>
        <title>Earlo.ai</title>
        <meta name="description" content="AI powered learning platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div ref={myRef} className="flex-1 flex overflow-auto">
        <Conversation conversation={conversation} />
      </div>

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
            autoComplete="false"
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
