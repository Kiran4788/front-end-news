
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router";
import { getArticles } from "../utils/api";
import { useSearchParams } from "react-router";
import SortByDropDown from "./SortByDropDown";
//show article card with image, title and read more button


const Articles = () => {
    const [params] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedSortOption, setSelectedSortOption] = useState("created_at");
    const [sortByOptions, setSortByOptions] = useState([
        { value: "created_at", label: "Created At" },
        { value: "votes", label: "Votes" },
        { value: "comment_count", label: "Comment Count" },
    ]);
    const [sortOrderOptions, setSortOrderOptions] = useState([
        { value: "asc", label: "Ascending" },
        { value: "desc", label: "Descending" },
    ]);
    const [sortOrder, setSortOrder] = useState("desc");


    const topic = params.get("topic") ? params.get("topic") : null;

    useEffect(() => {
        setLoading(true);
        getArticles(topic, selectedSortOption, sortOrder).then((articles) => {
            setArticles(articles);
        }
        ).catch((error) => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        }
        );
    }, [selectedSortOption,sortOrder]);

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
        <Container maxWidth="lg">


            <Box sx={{ flexGrow: 1, padding: 5 }}>

                <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 8, paddingTop: '40px' }}>
                    <SortByDropDown
                        sortOptions={sortByOptions}
                        selectedSortOption={selectedSortOption}
                        setSelectedSortOption={setSelectedSortOption}
                    />
                    <SortByDropDown
                        sortOptions={sortOrderOptions}
                        selectedSortOption={sortOrder}
                        setSelectedSortOption={setSortOrder}
                    />
                </Box>

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
        </Container>
    );
}
export default Articles;
