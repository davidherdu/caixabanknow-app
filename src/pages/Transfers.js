import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Collapse, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';

import { useStore } from '@nanostores/react';
import { accountsStore } from '../contexts/GlobalState';
import caixabankIcon from '../assets/caixabank-icon-blue.png'; // Make sure this path is correct
import TransferForm from '../components/TransferForm'; // Make sure this path is correct

const Transactions = () => {
    const { transfers, accounts } = useStore(accountsStore);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [showMoreTransactions, setShowMoreTransactions] = useState(false);
    const [transferDialogOpen, setTransferDialogOpen] = useState(false);

    // Complete this function to handle account selection
    const handleAccountSelect = (accountId) => {
        // Implement the functionality to select the account here
        // 1. Update the 'selectedAccountId' state with the selected account's ID.
        setSelectedAccountId(accountId);
        // 2. Reset the 'showMoreTransactions' state to 'false' when changing accounts.
        setShowMoreTransactions(false);
    };

    // Make sure 'filteredTransactions' is correctly filtered according to 'selectedAccountId'
    // Here we are extracting 'transfers' from the store and filtering based on 'selectedAccountId'
    const filteredTransactions = transfers.filter(transfer => 
        transfer.fromAccountId === selectedAccountId || transfer.toAccountId === selectedAccountId
    );


    // Complete this function to get the account name by its ID
    const getAccountNameById = (accountId) => {
        const account = accounts.find(account => account.id === accountId);
        return account ? account.name : 'Unknown Account';
    };

    const handleTransferDialogOpen = () => {
        setTransferDialogOpen(true);
    };

    const handleTransferDialogClose = () => {
        setTransferDialogOpen(false);
    };

    return (
        <Container sx={{ mt: 10, mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={caixabankIcon} alt="CaixaBank" style={{ height: '40px', marginRight: '10px' }} />
                <Typography variant="h4" component="div">
                    Transactions
                </Typography>
                <Button variant="contained" color="primary" onClick={handleTransferDialogOpen}>
                    Make Transfer
                </Button>
            </Box>
            <Dialog open={transferDialogOpen} onClose={handleTransferDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>Make Transfer</DialogTitle>
                <DialogContent>
                    <TransferForm onClose={handleTransferDialogClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransferDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccountBalanceIcon sx={{ mr: 1, color: '#007eae' }} />
                                Accounts
                            </Typography>
                            <List>
                                {accounts.map(account => (
                                    <ListItem
                                        button
                                        key={account.id}
                                        onClick={() => handleAccountSelect(account.id)}
                                        selected={selectedAccountId === account.id}
                                    >
                                        <ListItemText primary={account.name} secondary={`Balance: ${account.balance.toFixed(2)} ${account.currency}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TimelineIcon sx={{ mr: 1, color: '#007eae' }} />
                                Transactions
                            </Typography>
                            {selectedAccountId && filteredTransactions.length === 0 && (
                                <Typography variant="body1" color="textSecondary">
                                    No transactions found for this account.
                                </Typography>
                            )}
                            <List>
                                {filteredTransactions.slice(0, showMoreTransactions ? filteredTransactions.length : 2).map((transaction, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={`Transfer ${transaction.amount.toFixed(2)} €`}
                                            secondary={`From: ${getAccountNameById(transaction.fromAccountId)}, To: ${getAccountNameById(transaction.toAccountId)}`}
                                        />
                                    </ListItem>
                                ))}
                                <Collapse in={showMoreTransactions}>
                                    {filteredTransactions.slice(2).map((transaction, index) => (
                                        <ListItem key={index}>
                                            <ListItemText
                                                primary={`Transfer ${transaction.amount.toFixed(2)} €`}
                                                secondary={`From: ${getAccountNameById(transaction.fromAccountId)}, To: ${getAccountNameById(transaction.toAccountId)}`}
                                            />
                                        </ListItem>
                                    ))}
                                </Collapse>
                                {filteredTransactions.length > 2 && (
                                    <Button
                                        onClick={() => setShowMoreTransactions(!showMoreTransactions)}
                                        color="primary"
                                        sx={{ mt: 1 }}
                                    >
                                        {showMoreTransactions ? 'Show Less' : 'Show More'}
                                    </Button>
                                )}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Transactions;
