//Show text box for user to add a comment and  button to submit the comment
 import { Box, Button, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useParams } from "react-router";
import { postCommentByArticleId } from "../utils/api";


const AddNewComment = ({ setComments }) => {
    const { article_id } = useParams();
    const [comment, setComment] = useState("");
    const [username, setUsername] = useState("happyamy2016");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };   

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        postCommentByArticleId(article_id, username, comment)
            .then((comment) => {
                setComments((currentComments) => [comment, ...currentComments]);
                setComment("");
            })
            .catch((error) => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Add a comment</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                   disabled={true}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Comment"
                    value={loading?"Please wait, Comment is being added":error?"Error while adding comment":comment}
                    onChange={handleCommentChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    disabled={loading}
                    
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Box>
    );
}
export default AddNewComment;