import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Box, Divider } from '@mui/material';
import { useStore } from '@nanostores/react';
import { accountsStore } from '../contexts/GlobalState';

// Helper function to format date as MM/DD/YYYY
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const AccountDetails = ({ accountId }) => {
    // Implement data extraction from the store
    const {accounts, movements} = useStore(accountsStore);

    // Implement state for the account
    const [account, setAccount] = useState(null);
    // Implement state for the account's movements
    const [accountMovements, setAccountMovements] = useState([]);

    useEffect(() => {
        // Implement the logic to filter and update the selected account and its movements
        // 1. Filter the account that matches the provided `accountId`
        const selectedAccount = accounts.find((acc) => acc.id === parseInt(accountId));
        if (selectedAccount) {
            // 2. Filter the movements associated with the selected account
            const selectedMovements = movements.filter(
                (movement) => movement.accountId === parseInt(accountId)
            );
            
            // 3. Update the state with the selected account and related movements
            setAccount(selectedAccount);
            setAccountMovements(selectedMovements);
        } else {
            // If no account is found, reset the states
            setAccount(null);
            setAccountMovements([]);
        }

    }, [accountId, accounts, movements]); // Make sure to include the appropriate dependencies

    // Handle the case where the account is not found. It must be h6 and the message: "Account not found"
    if (!account) {
        return (
            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h6" color="error">Account not found</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5">{account.name}</Typography>
                <Typography variant="subtitle1">Balance: {account.balance} {account.currency}</Typography>
                <Typography variant="subtitle2">Account Number: {account.accountNumber}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>Recent Transactions</Typography>
            <List>
                {accountMovements.map((movement) => (
                    <ListItem key={movement.id}>
                        <ListItemText
                            primary={movement.description}
                            secondary={`Amount: ${movement.amount} ${account.currency} | Date: ${formatDate(movement.date)}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default AccountDetails;
