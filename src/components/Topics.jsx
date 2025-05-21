import { getTopics } from "../utils/api";
import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router";
import { Container } from "@mui/system";

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTopics().then((topics) => {
            setTopics(topics);
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
            Error fetching topics
        </Typography>
    }
    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 3, padding: 5 }}>
                {topics.map((topic) => (
                    <Card key={topic.slug} sx={{ marginBottom: 2 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image={topic.img_url}
                            alt={topic.slug}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {topic.slug}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {topic.description}
                            </Typography>
                            <Button component={Link} to={`/articles?topic=${topic.slug}`}>
                                View Articles
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
}
export default Topics;