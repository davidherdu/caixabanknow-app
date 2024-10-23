import React from 'react';
import { CircularProgress, Typography, Paper, Link, Box } from '@mui/material';
import useFetch from '../hooks/useFetch'; // Import useFetch hook

// Implement the useFetch hook
// Make sure that useFetch handles loading state, data, and errors.

const BrokerDetails = ({ brokerId }) => {
    // Call the useFetch hook with the API URL to get broker details
    // Get data from: `https://n47wv61fpe.execute-api.eu-west-1.amazonaws.com/pro/brokers/details?id=`
    const { data, loading, error } = useFetch(`https://n47wv61fpe.execute-api.eu-west-1.amazonaws.com/pro/brokers/details?id=${brokerId}`);

    // Handle the loading state by showing a spinner
    if (loading) return (
        <Paper sx={{ p: 2, mt: 3 }} data-testid="loading-container">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress data-testid="loading-spinner" />
            </Box>
        </Paper>
    );
    // Handle the error state by showing an error message
    if (error) return (
        <Paper sx={{ p: 2, mt: 3 }} data-testid="error-container">
            <Typography variant="body1" color="error" data-testid="error-message">Error: {error}</Typography>;
        </Paper>
    );

    // Display the broker details when the information has loaded
    /*
    Variables:
    Name: {data.nombre}
    Country: {data.pais}
    Address: {data.direccion}
    Phone: {data.telefono}
    Email: {data.email} -- Email must be a Link mailto
    License: {data.licencia}
    Active Since: {data.activo_desde}
    Website: {data.sitio_web} -- Website must be a Link
    */
    return (
        <Paper sx={{ p: 2, mt: 3 }} data-testid="broker-details-container">
            <Typography variant="h6" gutterBottom>
                Broker Details
            </Typography>
            <Typography variant="body1">
                <strong>Name:</strong> {data.nombre}
            </Typography>
            <Typography variant="body1">
                <strong>Country:</strong> {data.pais}
            </Typography>
            <Typography variant="body1">
                <strong>Address:</strong> {data.direccion}
            </Typography>
            <Typography variant="body1">
                <strong>Phone:</strong> {data.telefono}
            </Typography>
            <Typography variant="body1">
                <strong>Email:</strong> <Link href={`mailto:${data.email}`} data-testid="email-link">{data.email}</Link>
            </Typography>
            <Typography variant="body1">
                <strong>License:</strong> {data.licencia}
            </Typography>
            <Typography variant="body1">
                <strong>Active Since:</strong> {data.activo_desde}
            </Typography>
            <Typography variant="body1">
                <strong>Website:</strong> <Link href={data.sitio_web} target="_blank" rel="noopener" data-testid="website-link">{data.sitio_web}</Link>
            </Typography>
        </Paper>
    );
};

export default BrokerDetails;
