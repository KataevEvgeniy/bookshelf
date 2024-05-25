import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore,doc,updateDoc, addDoc, getDocs,deleteDoc , collection} from "firebase/firestore";
import {Button, List, ListItem, ListItemText, Paper} from "@mui/material";
import {BookList} from "./components/BookList.jsx";
import {BookFormDialog} from "./components/BookFormDialog.jsx";
import {BestBook} from "./components/BestBook.jsx";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export class Book {

    constructor(
        id='',
        title ='',
        authors = [],
        publicationYear = null,
        rating = 0,
        ISBN = null
    ) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.publicationYear = publicationYear;
        this.rating = rating;
        this.ISBN = ISBN;
    }

    toObject() {
        return {
            title: this.title,
            authors: this.authors,
            publicationYear: this.publicationYear,
            rating: this.rating,
            ISBN: this.ISBN
        };
    }

}

function App() {

    const [books, setBooks] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyDr4eYt8GbndOOSt6pxrKklYZ1zD0ZqEDM",
        authDomain: "bookshell-5252b.firebaseapp.com",
        projectId: "bookshell-5252b",
        storageBucket: "bookshell-5252b.appspot.com",
        messagingSenderId: "223517019331",
        appId: "1:223517019331:web:40bdda36b402ed9128e676",
        measurementId: "G-V4XCY0RKVM"
    };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    async function addBook(book) {
        try {
            const docRef = await addDoc(collection(db, "books"), book);

            let changedBooks = [...books]
            book.id = docRef.id
            changedBooks.push(book)
            setBooks(changedBooks)
            toast.success("Книга добавлена")
        } catch (e) {
            toast.error("Ошибка, попробуйте еще раз!")
            console.error(e)
        }
    }

    async function updateBook(updatedBook) {
        try {
            await updateDoc(doc(db, "books", updatedBook.id), updatedBook);
            let index = books.findIndex(book => book.id === updatedBook.id);
            let changedBooks = [...books];
            if (index !== -1) {
                changedBooks[index] = updatedBook;
            }
            setBooks(changedBooks);
            toast.success("Книга обновлена")
        } catch (error) {
            toast.error("Ошибка, попробуйте еще раз!")
        }
    }

    async function deleteBook(bookId){
        try {
            await deleteDoc(doc(db, "books",bookId));
            let index = books.findIndex(value => value.id === bookId)
            let changedBooks = [...books]
            if(index !== -1){
                changedBooks.splice(index,1)
            }

            setBooks(changedBooks)

            toast.success("Книга удалена")
        } catch (error) {
            toast.error("Ошибка, попробуйте еще раз!")
        }
    }

    async function getAllBooks() {
        const querySnapshot = await getDocs(collection(db, "books"));
        setBooks(querySnapshot.docs.map(doc => {
            return {...doc.data(), id: doc.id};
        }));

    }

    useEffect(() => {
        getAllBooks()

    }, []);

    useEffect(() => {
        console.log(books)
    }, [books]);

    return (
        <>

            <div style={{display:"flex" , flexDirection: "column",width:"100%",alignItems: "center"}}>
                <div style={{ width: "50%"}}>

                    <BookFormDialog handleSave={addBook}/>
                    <BestBook books={books}/>
                    <BookList books={books} handleDelete={deleteBook} handleEdit={updateBook}/>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default App
