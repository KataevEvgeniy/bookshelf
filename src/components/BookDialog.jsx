import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Book} from "../App.jsx";
import {toast} from "react-toastify";

export function BookDialog({open, setOpen, handleSave, bookToChange, title }) {

    const [book, setBook] = useState(new Book().toObject());

    useEffect(() => {
        if(bookToChange){
            setBook(bookToChange)
        }

    }, [bookToChange]);

    const handleChange = (event) => {
        if (event.target.name === "publicationYear") {
            setBook({...book, [event.target.name]: parseInt(event.target.value)});
            return;
        }
        if (event.target.name === "rating") {
            let rating = parseInt(event.target.value) || 0
            if (rating <= 10) {
                setBook({...book, [event.target.name]: parseInt(event.target.value)});
            }
            return;
        }
        if (event.target.name === "authors") {
            setBook({...book, [event.target.name]: event.target.value.split(",")});
            return;
        }
        setBook({...book, [event.target.name]: event.target.value});
    };

    const bookIsValid = () => {

        if (book.title === '' || book.title.length > 100) {
            toast.error("Длинна названия должна быть не более 100 символов")
            return false;
        }
        if (book.authors.length === 0) {
            toast.error("Должен быть хотя бы один автор")
            return false;
        }
        if (book?.publicationYear != null && book.publicationYear < 1800) {
            toast.error("Год публикации не раньше 1800")
            return false;
        }
        return true
    }

    function isValidISBN() {
        if(!book.ISBN){
            return true;
        }

        let isbn = book.ISBN.replace(/-/g, ""); // удаляем дефисы

        if (!/^\d{10}$|^\d{13}$/.test(isbn)) {
            toast.warning("ISBN должна содержать 10 или 13 цифр")
            return false; // ISBN should consist of 10 or 13 digits
        }

        if (isbn.length === 13) {
            let sum = 0;
            for (let i = 0; i < 13; i += 2) {
                sum += Number(isbn[i]);
            }
            for (let i = 1; i < 12; i += 2) {
                sum += 3 * Number(isbn[i]);
            }
            return sum % 10 === 0; // The checksum for ISBN-13 should be a multiple of 10
        }

        if (isbn.length === 10) {
            let sum = 0;
            for (let i = 0; i < 9; i++) {
                sum += Number(isbn[i]) * (10 - i);
            }
            let checkDigit = isbn[9] === 'X' ? 10 : Number(isbn[9]);
            sum += checkDigit;
            return sum % 11 === 0; // The checksum for ISBN-10 should be a multiple of 11
        }
        toast.warning("ISBN не верный")
        return false;
    }
    const handleSaveClick = () => {

        if (bookIsValid() && isValidISBN()) {
            console.log(book)
            handleSave(book);
            setBook(new Book());
        }

    };


    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Название"
                    type="text"
                    fullWidth
                    value={book?.title || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="authors"
                    label="Авторы"
                    type="text"
                    fullWidth
                    value={book?.authors || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="publicationYear"
                    label="Год публикации"
                    type="number"
                    fullWidth
                    value={book?.publicationYear || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="rating"
                    label="Рейтинг"
                    type="number"
                    fullWidth
                    value={book?.rating || ''}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="ISBN"
                    label="ISBN"
                    type="text"
                    fullWidth
                    value={book?.ISBN || ''}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Отмена</Button>
                <Button onClick={handleSaveClick}>Сохранить</Button>
            </DialogActions>
        </Dialog></>
    )
}