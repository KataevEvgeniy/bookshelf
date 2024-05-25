import {useEffect, useState} from "react";
import {IconButton, ListItem, ListItemText, Paper} from "@mui/material";
import {red} from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete.js";

export function BestBook({ books }) {
    const [bestBook, setBestBook] = useState(null);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const goodBooks = books.filter(book => (currentYear - book.publicationYear) >= 3 && book.publicationYear !== null);
        const highestRating = Math.max(...goodBooks.map(book => book.rating));
        const bestBooks = goodBooks.filter(book => book.rating === highestRating);
        const randomBestBook = bestBooks[Math.floor(Math.random() * bestBooks.length)];
        setBestBook(randomBestBook);
    }, [books]);

    return (
        <div>
            {bestBook ? (

                <Paper elevation={3} style={{margin: '10px 0', borderRadius: '15px', border: '2px solid gold'}}>
                    <ListItem>
                        <ListItemText
                            primary={`Рекомендуемая книга: ${bestBook.title}`}
                            secondary={`Автор: ${bestBook.authors.join(', ')} | Год публикации: ${bestBook.publicationYear} | Рейтинг: ${bestBook.rating}`}
                        />
                    </ListItem>
                </Paper>
            ) : (
                <p>Нет рекомендаций</p>
            )}
        </div>
    );
}