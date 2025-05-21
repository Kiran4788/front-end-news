import { patchArticleById } from "../utils/api";
// Show heart button to like and show number of votes
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";


const Votes = ({ votes }) => {
    const { article_id } = useParams();
    const [voteCount, setVoteCount] = useState(votes);
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleVote = (inc_votes) => {
        if (!hasLiked) {
            setHasLiked(true);
            setLoading(true);
            patchArticleById(article_id, inc_votes)
                .then((article) => {
                    setVoteCount(article.votes);
                })
                .catch((error) => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);

                });
        }
    }

    if (loading) {
        return <Typography gutterBottom variant="h7" component="div">
            Loading...
        </Typography>
    }
    if (error) {
        return <Typography gutterBottom variant="h3" component="div">
            Error updating votes
        </Typography>
    }
    const likeStr = hasLiked ? "Liked" : "Like";


    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleVote(1)}
                disabled={hasLiked}
            >
                {likeStr}
            </Button>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
                {voteCount} votes
            </Typography>
        </Box>
    );
}
export default Votes;

