import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Snackbar, Alert } from '@mui/material';
import { useStore } from '@nanostores/react';
import { accountsStore, addTransfer } from '../contexts/GlobalState';

const TransferForm = ({ onClose }) => {
    const [amount, setAmount] = useState('');
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { accounts } = useStore(accountsStore);

    // Implement form validation
    const validate = () => { 
        const newErrors = {};
        if (!fromAccount) newErrors.fromAccount = 'Please select a source account.';
        if (!toAccount) newErrors.toAccount = 'Please select a destination account.';
        if (!amount) {
            newErrors.amount = 'Please enter an amount.';
        } else if (isNaN(amount) || amount <= 0) {
            newErrors.amount = 'Please enter a valid amount.';
        } else if (Number(amount) > getAccountBalance(fromAccount)) {
            newErrors.amount = 'Insufficient funds in the source account.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    // Get account balance by account ID
    const getAccountBalance = (accountId) => {
        const account = accounts.find(account => account.id === accountId);
        return account ? account.balance : 0;
    };

    // Implement logic to handle form submission
    const handleSubmit = (e) => { 
        e.preventDefault(); // Prevent default form submission
        if (validate()) {
            // Create transfer object
            const transfer = {
                from: fromAccount,
                to: toAccount,
                amount: parseFloat(amount), // Ensure amount is a number
            };

            // Dispatch transfer action
            addTransfer(transfer); // Assume this adds the transfer to your store
            setSnackbarMessage('Transfer successful!');
            setSnackbarOpen(true);
            resetForm(); // Reset form after successful transfer
        } else {
            setSnackbarMessage('Please fix the errors in the form.');
            setSnackbarOpen(true);
        }
    };

    // Reset the form fields
    const resetForm = () => {
        setAmount('');
        setFromAccount('');
        setToAccount('');
        setErrors({});
    };

    // Implement functionality to close the snackbar
    const handleCloseSnackbar = () => { 
        setSnackbarOpen(false);
        onClose(); // Call onClose to notify parent component if needed
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="From Account"
                variant="outlined"
                select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                error={!!errors.fromAccount}
                helperText={errors.fromAccount}
                fullWidth
                name="fromAccount"
            >
                {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                        {account.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="To Account"
                variant="outlined"
                select
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                error={!!errors.toAccount}
                helperText={errors.toAccount}
                fullWidth
                name="toAccount"
            >
                {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                        {account.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={!!errors.amount}
                helperText={errors.amount}
                fullWidth
                name="amount"
            />
            <Button type="submit" variant="contained" color="primary">
                Transfer
            </Button>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={Object.values(errors).some(x => x) ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TransferForm;
