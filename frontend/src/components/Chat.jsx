import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const loadMessages = () => {
    fetch('https://greenmart-backend-e4mw46oef-sanj33ds-projects.vercel.app/chat')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const msg = { user: 'Anonymous', text };
    fetch('https://greenmart-backend-e4mw46oef-sanj33ds-projects.vercel.app/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    })
      .then((res) => res.json())
      .then(() => {
        setText('');
        loadMessages();
      });
  };

  const handleDelete = (id) => {
    fetch(`https://greenmart-backend-e4mw46oef-sanj33ds-projects.vercel.app/chat/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => loadMessages());
  };

  return (
    <div className="m-6">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="space-y-2 mb-4">
        {messages.map((m) => (
          <div key={m._id} className="p-2 border rounded">
            <strong>{m.user || 'Anon'}:</strong> {m.text}{' '}
            <button
              onClick={() => handleDelete(m._id)}
              className="text-red-500 hover:underline"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          className="input input-bordered flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
