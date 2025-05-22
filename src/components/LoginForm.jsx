import { AccountContext } from "../context/Account";

//show form to login with list of users from get users api
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api";

const LoginForm = () => {
    const { setLoggedInUser } = useContext(AccountContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUsers().then((users) => {
            setUsers(users);
        }).catch((error) => {
            setError(true);
        }
        ).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoggedInUser(selectedUser);
    };

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
        <Container maxWidth="sm">
            <Box sx={{ flexGrow: 1, padding: 5 }}>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <InputLabel id="user-select-label">Select User</InputLabel>
                        <Select
                            labelId="user-select-label"
                            value={selectedUser}
                            onChange={handleChange}
                            label="Select User"
                        >
                            {users.map((user) => (
                                <MenuItem key={user.username} value={user.username}>
                                    {user.username}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
export default LoginForm;