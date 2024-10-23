import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountDetails from '../../src/components/AccountDetails';
import { GlobalStateProvider } from '../../src/contexts/GlobalState';

// Mock data for the tests
const mockAccounts = [
    { id: 1, name: 'Checking Account', balance: 1000, accountNumber: '1234567890', type: 'Checking', currency: 'EUR' },
    { id: 2, name: 'Savings Account', balance: 5000, accountNumber: '0987654321', type: 'Savings', currency: 'USD' },
];

const mockMovements = [
    { id: 1, accountId: 1, description: 'Grocery Shopping', amount: -50, date: '2023-01-01' },
    { id: 2, accountId: 1, description: 'Salary', amount: 1500, date: '2023-01-15' },
];

// Mock GlobalStateProvider and its store
const renderWithGlobalState = (accountId) => {
    return render(
        <GlobalStateProvider initialState={{ accounts: mockAccounts, movements: mockMovements }}>
            <AccountDetails accountId={accountId} />
        </GlobalStateProvider>
    );
};


// Tests
describe('AccountDetails Component', () => {
    // Test case for rendering valid account details
    it('should render the account details correctly', () => {
        renderWithGlobalState(1); // Pass a valid account ID
        expect(screen.getByText('Checking Account')).toBeInTheDocument();
        expect(screen.getByText('Balance: 1000 EUR')).toBeInTheDocument();
        expect(screen.getByText('Account Number: 1234567890')).toBeInTheDocument();
        expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
        expect(screen.getByText('Grocery Shopping')).toBeInTheDocument();
        expect(screen.getByText('Amount: -50 EUR | Date: 1/1/2023')).toBeInTheDocument();
        expect(screen.getByText('Salary')).toBeInTheDocument();
        expect(screen.getByText('Amount: 1500 EUR | Date: 1/15/2023')).toBeInTheDocument();
    });

    it('should display "Account not found" when the account ID is invalid', () => {
        renderWithGlobalState(999); // Pass an invalid account ID
        expect(screen.getByText('Account not found')).toBeInTheDocument();
    });
});
