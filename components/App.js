import React, { useState } from 'react';

const FILTERS = ['All', 'Active', 'Completed'];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');

  function addTodo(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const visible = todos.filter(t =>
    filter === 'All' ? true : filter === 'Completed' ? t.done : !t.done
  );

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add todo" />
        <button type="submit">Add</button>
      </form>
      <div>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} disabled={filter === f}>{f}</button>
        ))}
      </div>
      <ul>
        {visible.map(t => (
          <li key={t.id} onClick={() => toggleTodo(t.id)} style={{ textDecoration: t.done ? 'line-through' : 'none', cursor: 'pointer' }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
