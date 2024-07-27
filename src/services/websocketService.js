let chatSocket;

export const connectWebSocket = (userId, accessToken, onMessageReceived, onError, onClose) => {
  chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userId}/`, [accessToken]);

  chatSocket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  chatSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessageReceived(data);
  };

  chatSocket.onclose = () => {
    console.log("WebSocket connection closed");
    if (onClose) {
      onClose();
    }
  };

  chatSocket.onerror = (error) => {
    console.error("WebSocket error: ", error);
    if (onError) {
      onError(error);
    }
  };
};

export const disconnectWebSocket = () => {
  if (chatSocket) {
    chatSocket.close();
  }
};

export const sendMessage = (message, receiver) => {
  if (chatSocket && message.trim() !== "") {
    chatSocket.send(
      JSON.stringify({
        message: message,
        receiver: receiver,
      })
    );
  }
};
