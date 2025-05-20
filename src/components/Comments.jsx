import { getCommentsByArticleId } from "../utils/api";
//use mui accordian to show comments
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { formatDate } from "../utils/utils";


const Comments = () => {
    const { article_id } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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