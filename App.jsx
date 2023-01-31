import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

function AddBook({books, setBooks}) {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [id, setId] = useState(0);
    
    const addBook = () => {
        const book = {
            id: id,
            name: name,
            author: author,
            price: price,
        };
        setBooks([...books, book]);
        setId(id + 1);
        setName("");
        setAuthor("");
        setPrice("");
    };
    const deleteBook = (id) => {
        const newBooks = books.filter((book) => book.id !== id);
        setBooks(newBooks);
    };
    return (
        <div>
            <h1>Add Book</h1>
            <input
                type="text"
                placeholder="Book name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button onClick={addBook}>Add Book</button>
            <table border={1}>
                <tr>
                    <th>Book name</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Delete</th>
                </tr>
                {books.map((book) => (
                    <tr>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        <td>
                            <button onClick={() => deleteBook(book.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}


function About() {
    return (
        <div className="about">
            <h1>About</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                quae, voluptates, quod, voluptatibus quibusdam voluptatem
                voluptatum quidem quos quia quas nesciunt. Quisquam, quod
                voluptatum. Quisquam, quod voluptatum. Quisquam, quod voluptatum.
            </p>
        </div>
    );
}

function Home({ books, setBooks }) {
    return (
        <div>
            <table border={1}>
                <tr>
                    <th>Book name</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Comments</th>
                </tr>
                {books.map((book) => (
                    <tr>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        <td>{book.comment}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

function Comments({ books, setBooks }) {
    const { id } = useParams();
    const book = books.find((book) => book.id === parseInt(id));
    const [comment, setComment] = useState("");
    const addComment = () => {
        const newBooks = books.map((book) => {
            if (book.id === parseInt(id)) {
                return {
                    ...book,
                    comment: comment,
                };
            }
            return book;
        });
        setBooks(newBooks);
        setComment("");
    };
    return (
        <div>
            <h1>Comments</h1>
            <input
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={addComment}>Add Comment</button>
            <p>{book.comment}</p>
        </div>
    );
}

function Book({ books }) {
    const { id } = useParams();
    const book = books.find((book) => book.id === parseInt(id));
    return (
        <div>
            <h1>{book.name}</h1>
            <p>{book.author}</p>
            <p>{book.price}</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur rerum, distinctio cumque ut ipsam cum quia soluta repellat dicta tenetur, alias iusto natus, facilis vel. Similique quisquam perferendis excepturi tempore!</p>
        </div>
    );
}



function App() {
    const [books, setBooks] = useState([
        {
            id: 1,
            name: "Harry Potter",
            author: "J.K. Rowling",
            price: 100,
        },
        {
            id: 2,
            name: "Lord of the Rings",
            author: "J.R.R. Tolkien",
            price: 100,
        },
        {
            id: 3,
            name: "The Hobbit",
            author: "J.R.R. Tolkien",
            price: 100,
        },
    ]);
    
    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/comments">Comments</Link>
                            </li>
                            <li>
                                <Link to="/addBook">Add Book</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/addBook" element={<AddBook books={books} setBooks={setBooks} />} />
                        <Route path="/comments/:id" element={<Comments books={books} setBooks={setBooks} />} />
                        <Route path='/book/:id' element={<Book books={books} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
                        <Route path="*" element={<h1>404</h1>} />
                    </Routes>
                </div>
            </Router>
            
        </div>
    );
}

export default App;
