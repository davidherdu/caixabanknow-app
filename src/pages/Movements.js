import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Collapse, Button, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';

import { useStore } from '@nanostores/react';
import { accountsStore } from '../contexts/GlobalState';
import caixabankIcon from '../assets/caixabank-icon-blue.png'; // Make sure this path is correct

const Movements = () => {
    const store = useStore(accountsStore);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [showMoreMovements, setShowMoreMovements] = useState(false);

    // Complete this function to handle account selection
    const handleAccountSelect = (accountId) => {
        // Implement the functionality to select the account here
        // 1. Update the 'selectedAccountId' state with the selected account's ID.
        setSelectedAccountId(accountId);
        // 2. Reset the 'showMoreMovements' state to 'false' when changing accounts.
        setShowMoreMovements(false);
    };

    // Make sure 'movements' is correctly filtered according to 'selectedAccountId'
    // Here we are extracting 'movements' from the store and filtering based on 'selectedAccountId'
    //const filteredMovements;
    const filteredMovements = store.movements.filter(movement => movement.accountId === selectedAccountId) || [];

    return (
        <Container sx={{ mt: 10, mb: 4 }}>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={caixabankIcon} alt="CaixaBank" style={{ height: '40px', marginRight: '10px' }} />
                <Typography variant="h4" component="div">
                    Movements
                </Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccountBalanceIcon sx={{ mr: 1, color: '#007eae' }} />
                                Accounts
                            </Typography>
                            <List>
                                {/* Display the list of accounts using store.accounts */}
                                {/* Here we need to implement the mapping of accounts from the store */}
                                {/** Implement here **/}
                                {store.accounts.map(account => (
                                    <ListItem 
                                        button 
                                        key={account.id} 
                                        onClick={() => handleAccountSelect(account.id)} 
                                        selected={selectedAccountId === account.id}
                                    >
                                        <ListItemText primary={account.name} />
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
                                Movements
                            </Typography>
                            {selectedAccountId && filteredMovements.length === 0 && (
                                <Typography variant="body1" color="textSecondary">
                                    No movements found for this account.
                                </Typography>
                            )}
                            <List>
                                {/* Display the first 2 movements using filteredMovements */}
                                {/* Here we need to implement the visualization of the first 2 movements */}
                                {/** Implement here **/}
                                {filteredMovements.slice(0, 2).map((movement, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={movement.description} secondary={`€${movement.amount} - ${movement.date}`} />
                                    </ListItem>
                                ))}
                                <Collapse in={showMoreMovements}>
                                    {/* Display additional movements when 'showMoreMovements' is true */}
                                    {/* Here we need to implement the visualization of additional movements */}
                                    {/** Implement here **/}
                                    {filteredMovements.slice(2).map((movement, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={movement.description} secondary={`€${movement.amount} - ${movement.date}`} />
                                        </ListItem>
                                    ))}
                                </Collapse>
                                {/* Display the "Show More" button if there are more than 2 movements */}
                                {/* Here we need to implement the logic to display the "Show More" button */}
                                {/** Implement here **/}
                                {filteredMovements.length > 2 && (
                                    <Button onClick={() => setShowMoreMovements(!showMoreMovements)} sx={{ mt: 2 }}>
                                        {showMoreMovements ? 'Show Less' : 'Show More'}
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

export default Movements;
