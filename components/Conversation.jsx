import { ChatAltIcon, TagIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Coversation({ conversation }) {
  return (
    <div className="flow-root w-full">
      <ul role="list" className="p-4 pb-0">
        {conversation.map((conversationItem, conversationItemIdx) => (
          <li key={conversationItemIdx}>
            <div className="relative pb-8">
              <div className="relative flex items-start space-x-3">
                <>
                  <div className="min-w-0 flex-1">
                    <div className="">
                      <div className="text-sm">
                        <div
                          className={classNames(
                            "font-medium text-gray-900",
                            conversationItem.name == "You" ? "text-right" : ""
                          )}
                        >
                          {conversationItem.name}
                        </div>
                      </div>
                    </div>
                    <div
                      className={classNames(
                        "mt-2 text-sm p-4 rounded-3xl",
                        conversationItem.name == "You"
                          ? "bg-blue-500 text-white rounded-tr float-right"
                          : "bg-gray-200 text-gray-700 rounded-bl float-left"
                      )}
                    >
                      <p>{conversationItem.text}</p>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
