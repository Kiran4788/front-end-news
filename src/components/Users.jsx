//show user cards
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";

const Users = () => {   
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUsers().then((users) => {
            setUsers(users);
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
            Error fetching users
        </Typography>
    }
    return (
      //use card to show user image and name
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 3, padding: 5 }}>
                <Grid container spacing={2}>
                    {users.map((user) => (
                        <Grid item xs={12} sm={6} md={4} key={user.username}>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2 }}>
                                <Typography variant="h5">{user.username}</Typography>
                                <img src={user.avatar_url} alt={user.username} style={{ width: '100%', borderRadius: '8px' }} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}
export default Users;