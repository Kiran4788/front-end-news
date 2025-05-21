import { getArticleById } from "../utils/api";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router";
import Comments from "./Comments";
import { Container } from "@mui/system";
import Votes from "./Votes";

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getArticleById(article_id).then((article) => {
            setArticle(article);
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
            Error fetching article
        </Typography>
    }
    if (!article) {
        return <div>No article found</div>;
    }
    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 3, padding: 5 }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="300"
                        image={article.article_img_url}
                        alt={article.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {article.body}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="div">
                            Author: {article.author}
                        </Typography>
                    </CardContent>
                </Card>
                <Votes votes={article.votes} />
            </Box>
            <Box sx={{ padding: 1 }}>
                <Comments />
            </Box>
        </Container>

    );
}
export default Article;