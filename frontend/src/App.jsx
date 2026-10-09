import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/books`);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, description })
      });
      if (res.ok) {
        setTitle('');
        setAuthor('');
        setDescription('');
        fetchBooks();
      }
    } catch (error) {
      console.error('Error adding book', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>My Book Recorder</h1>
        <p>Keep track of all your favorite reads</p>
      </header>
      
      <main>
        <section className="form-section">
          <h2>Add a New Book</h2>
          <form onSubmit={handleSubmit} className="book-form">
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g., The Great Gatsby" />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required placeholder="e.g., F. Scott Fitzgerald" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="A brief summary..."></textarea>
            </div>
            <button type="submit" className="btn-submit">Add Book</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Your Library</h2>
          {books.length === 0 ? (
            <div className="empty-state">No books added yet. Start your collection!</div>
          ) : (
            <div className="books-grid">
              {books.map(book => (
                <div key={book._id} className="book-card">
                  <div className="book-content">
                    <h3>{book.title}</h3>
                    <p className="author">by {book.author}</p>
                    {book.description && <p className="description">{book.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
