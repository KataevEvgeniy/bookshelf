import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {Book} from "../App";
import {BestBook} from "./BestBook.jsx";
import {BookDialog} from "./BookDialog.jsx";

export function BookFormDialog({handleSave}) {


    const [open, setOpen] = useState(false);


    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}
                    style={{width: "100%", marginBottom: "10px", borderRadius: "15px"}}>
                Добавить книгу
            </Button>
            <BookDialog handleSave={handleSave} open={open} setOpen={setOpen} title={"Создать книгу"}/>

        </>
    );
}