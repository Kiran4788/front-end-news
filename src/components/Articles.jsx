import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router";
import { getArticles } from "../utils/api";
//show article card with image, title and read more button


const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getArticles().then((articles) => {
            setArticles(articles);
        }
        ).catch((error) => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        }
        );
    }, []);

    if (loading) {
        return <Typography gutterBottom variant="h3" component="div">
            Loading...
        </Typography>
    }
    if (error) {
        return <Typography gutterBottom variant="h3" component="div">
           Error fetching articles
        </Typography>
    }
    return (
        <Box sx={{ flexGrow: 1, padding: 5 }}>
            <Grid container spacing={2}>
                {articles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article.article_id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="250"
                                image={article.article_img_url}
                                alt={article.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {article.title}
                                </Typography>

                            </CardContent>
                            <Button component={Link} to={`/articles/${article.article_id}`}>
                                Read More
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
export default Articles;
