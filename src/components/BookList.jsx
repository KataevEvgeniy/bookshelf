import {Button, IconButton, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {flatMap, groupBy, sortBy} from "lodash";
import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {blue, red} from "@mui/material/colors";
import {BookDialog} from "./BookDialog.jsx";

export function BookList({books,handleDelete,handleEdit}) {

    const [sortDirection, setSortDirection] = useState('desc');
    const [groupByField, setGroupByField] = useState('year');

    const [groupedBooks, setGroupedBooks] = useState([]);
    const [sortedGroups, setSortedGroups] = useState([]);

    const [open, setOpen] = useState(false);
    const [book,setBook] = useState(null)

    useEffect(() => {
        setGroupedBooks(groupBy(books, book => {
            switch (groupByField) {
                case 'year':
                    return book.publicationYear || "Неизвестно";
                case 'rating':
                    return book.rating || "Неизвестно";
                case 'author':
                    return book.authors[0];
                default:
                    return "Неизвестно";
            }
        }))
    }, [books, groupByField]);

    useEffect(() => {
        let sortedGroups = Object.keys(groupedBooks).sort()
        if (sortDirection === 'desc') {
            sortedGroups.reverse()
        }
        let noSortValue = "Неизвестно"
        let noSortIndex = sortedGroups.indexOf(noSortValue)
        if (noSortIndex !== -1) {
            sortedGroups.splice(noSortIndex, 1)
            sortedGroups.push(noSortValue)
        }

        setSortedGroups(sortedGroups)
    }, [groupedBooks, sortDirection]);

    const handleStartEdit = (book) =>{
        setBook(book)
        setOpen(true)
    }

    return (
        <>
            <div style={{display: "flex", gap: "20px", width: "100%", flexDirection: "row"}}>
                <div style={{display: "flex", fontSize: "12px"}}>
                    <Button style={{fontSize: "10px"}} variant={"outlined"} onClick={() => setSortDirection('asc')}>Сортировать по возрастанию</Button>
                    <Button style={{fontSize: "10px"}} variant={"outlined"} onClick={() => setSortDirection('desc')}>Сортировать по убыванию</Button>
                </div>
                <div style={{display: "flex"}}>
                    <Button style={{fontSize: "10px"}} variant={"outlined"} onClick={() => setGroupByField('year')}>Группировать по году</Button>
                    <Button style={{fontSize: "10px"}} variant={"outlined"} onClick={() => setGroupByField('rating')}>Группировать по рейтингу</Button>
                    <Button style={{fontSize: "10px"}} variant={"outlined"} onClick={() => setGroupByField('author')}>Группировать по автору</Button>
                </div>
            </div>
            <BookDialog open={open} setOpen={setOpen} book handleSave={handleEdit}  bookToChange={book} title={"Изменить книгу"} />

            {sortedGroups.map((groupName) => (
                <div key={groupName}>
                    <Typography variant="h6" style={{marginTop: '20px'}}>{groupName}</Typography>
                    <List>
                        {sortBy(groupedBooks[groupName], "title").map((book, index) => (
                            <Paper elevation={3} style={{margin: '10px 0', borderRadius: '15px'}} key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={book.title}
                                        secondary={`Автор: ${book.authors.join(', ')} | Год публикации: ${book.publicationYear} | Рейтинг: ${book.rating} | ISBN: ${book.ISBN}`}
                                    />
                                    <IconButton edge="end" aria-label="edit" onClick={()=> {handleStartEdit(book)}} style={{ color: blue[500] }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(book.id)} style={{ color: red[500] }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                </div>
            ))}
        </>
    );
}