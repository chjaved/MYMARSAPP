import { useStateProvider } from "@/context/StateContext";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { calculateTime } from "@/utils/CalculateTime";
import { BsCheckAll, BsCheckLg } from "react-icons/bs";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import axios from "axios";
import { DELETE_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";

const VoiceMessage = dynamic(() => import("@/components/Chat/VoiceMessage"), {
  ssr: false,
});

export default function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();

  const [{ socket }, dispatch] = useStateProvider();
  const containerRef = useRef(null);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-deleted", ({ id }) => {
        dispatch({
          type: reducerCases.UPDATE_MESSAGE,
          updatedMessage: { id, messageStatus: 'deleted' },
        });
      });
    }
  }, [socket, dispatch]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${MESSAGES_ROUTE}/${currentChatUser.id}`);
        dispatch({
          type: reducerCases.SET_MESSAGES,
          messages: data.messages,
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchMessages();
  }, [currentChatUser, dispatch]);
  

  
  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-deleted", ({ id }) => {
        dispatch({
          type: reducerCases.UPDATE_MESSAGE,
          updatedMessage: { id, messageStatus: 'deleted' },
        });
      });
    }
  }, [socket, dispatch]);

  

  const deleteMessage = async (id) => {
    try {
      const { data } = await axios.put(`${DELETE_MESSAGE_ROUTE}/${id}`);
      
      socket.current.emit("update-msg", { id });
      
      dispatch({
        type: reducerCases.UPDATE_MESSAGE,
        updatedMessage: {
          id,
          messageStatus: 'deleted',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div
      className="h-[80vh] w-full relative flex-grow overflow-auto "
      ref={containerRef}
    >
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0 ">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderId === currentChatUser.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {(message.type === "text" && (message.messageStatus==='read' || message.messageStatus==='delivered' || message.messageStatus==='sent')) && (
                  <div
                    className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%]	 ${
                      message.senderId === currentChatUser.id
                        ? "bg-blue-400"
                        : "bg-blue-600"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 items-end">
                      <span className="text-white text-[11px] pt-1 min-w-fit">
                        {calculateTime(message.createdAt)}
                      </span>
                      <span>
                      <button onClick={() => deleteMessage(message.id)} className="delete-button">
  Delete
</button>

                        {message.senderId === userInfo.id && (
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        )}
                      </span>

                   
                    </div>
                  </div>
                )}
                {message.type === "image" && <ImageMessage message={message} />}
                {message.type === "audio" && <VoiceMessage message={message} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
