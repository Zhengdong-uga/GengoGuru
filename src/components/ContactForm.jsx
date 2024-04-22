import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        // Formspree integration
        const response = await fetch('https://formspree.io/f/mgegpbeq', { // Replace {your-form-id} with your actual Formspree form ID
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            setSubmitted(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            }); // Clear the form
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h6">Contact Us</Typography>
            {submitted && (
                <Typography color="green" sx={{ mb: 2 }}>
                    Thank you for your message!
                </Typography>
            )}
            <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                margin="normal"
                required
            />
            <Button type="submit" color="primary" variant="contained" disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.message}>
                Send
            </Button>
        </Box>
    );
};

export default ContactForm;
