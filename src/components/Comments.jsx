import { getCommentsByArticleId } from "../utils/api";
//use mui accordian to show comments
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Icon, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { formatDate } from "../utils/utils";
import { deleteCommentById } from "../utils/api";
import { AccountContext } from "../context/Account";


const Comments = ({ comments, setComments }) => {
    const { article_id } = useParams();
    const { loggedInUser } = useContext(AccountContext);
   // const [username, setUsername] = useState("happyamy2016");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCommentsByArticleId(article_id).then((comments) => {
            setComments(comments);
        }
        ).catch((error) => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        }
        );
    }, [article_id]);

    const handleDeleteComment = (comment_id) => {
        setDeleteLoading(true);
        setComments((currentComments) => currentComments.filter((comment) => comment.comment_id !== comment_id));
        setTimeout(() => {
            deleteCommentById(comment_id)
                .then(() => {
                    setComments((currentComments) => currentComments.filter((comment) => comment.comment_id !== comment_id));
                })
                .catch((error) => {
                    setDeleteError(true);
                })
                .finally(() => {
                    setDeleteLoading(false);
                });
        }
            , 1000);
    }

    if (loading) {
        return <Typography gutterBottom variant="h3" component="div">
            Loading...
        </Typography>
    }
    if (error) {
        return <Typography gutterBottom variant="h3" component="div">
            Error fetching comments
        </Typography>
    }
    if (!comments.length) {
        return <Typography gutterBottom variant="h3" component="div">
            No comments found
        </Typography>
    }
    const deleteStr = deleteLoading ? "Deleting..." : deleteError ? "Error while deleting comment" : "Delete";

    return (
        <Box sx={{ flexGrow: 1, padding: 5 }}>

            <Typography gutterBottom variant="h5" component="div">
                Click on the comment to see the details
            </Typography>
            {comments.map((comment) => (
                <Accordion key={comment.comment_id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Author: {comment.author}   </Typography>
                        <Typography sx={{ paddingLeft: 5 }}> Created:   {formatDate(comment.created_at)}</Typography>
                        {loggedInUser === comment.author && (
                                <Button align="right"
                                    sx={{ marginLeft: 2 }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteComment(comment.comment_id)}
                                    disabled={deleteLoading|deleteError}
                                >
                                    {deleteStr}
                                </Button>
                            )}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {comment.body}
                           
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
export default Comments;