import { useState, useEffect } from "react";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [messageError, setMessageError] = useState(null);
  const [messageIsLoading, setMessageIsLoading] = useState(false);

  // Fetch all messages (admin use)
  const fetchMessages = async () => {
    setMessageIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/Messages");
      const data = await response.json();
      setMessages(data.data);
      return data.data;
    } catch (err) {
      setMessageError("Something went wrong fetching messages");
      console.error(err);
    } finally {
      setMessageIsLoading(false);
    }
  };

  // Create new message (Kontakt form)
  const createMessage = async (messageData) => {
    setMessageIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      setMessageIsLoading(false);
    }
  };

  // Update message
  const updateMessage = async (id, updateData) => {
    try {
      const response = await fetch(`http://localhost:3042/message/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/message/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch single message
  const fetchMessageById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/message/${id}`);
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error(err);
    }
  };

  // Optional: fetch all immediately (admin only)
  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    fetchMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    fetchMessageById,
    messageError,
    messageIsLoading,
  };
};
