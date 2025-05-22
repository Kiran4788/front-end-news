import {createContext, useState} from "react";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <AccountContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </AccountContext.Provider>
    );
}