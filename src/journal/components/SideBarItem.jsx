import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"




export const SideBarItem = ({ title = '', body, id, date, imageUrl = [], }) => {

    const dispatch = useDispatch()

    const onClickActiveNote = () => {
        dispatch(setActiveNote({ id, title, body, date, imageUrl }));
    };
    //Para reducir el titulo mostrado
    const newTitle = useMemo(() => {
        //si el titulo es mayor a 17 posiciones entonces se corta y se agregan los ... 
        //sino se manda el titulo completo.
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title])

    return (
        <ListItem disablePadding >
            <ListItemButton onClick={onClickActiveNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
