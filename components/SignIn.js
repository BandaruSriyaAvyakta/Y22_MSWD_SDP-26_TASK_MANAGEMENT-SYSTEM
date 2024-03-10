import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Link, FormControlLabel, Checkbox, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './SignIn.css'; // Import the CSS file

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (password.length < 8) return false;
        if (!/[a-z]/.test(password)) return false;
        if (!/[A-Z]/.test(password)) return false;
        if (!/[0-9]/.test(password)) return false;
        return true;
    };

    const handleSignIn = () => {
        if (!validatePassword(password)) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        navigate('/Home');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="signin">
            <Container className="signin-form" component="main" maxWidth="sm" style={{ marginTop: '20vh' }}>
                <Paper elevation={3} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" align="center">
                        Sign In
                    </Typography>
                    <form style={{ width: '100%', marginTop: '2rem', marginLeft: '4rem', marginRight: '4rem', maxHeight: '120vh' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { backgroundColor: 'transparent' } }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ '& .MuiInputBase-input': { backgroundColor: 'transparent' } }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {passwordError && (
                            <Alert severity="error" style={{ marginTop: '1rem' }}>
                                Password is invalid. It must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long.
                            </Alert>
                        )}
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
                            label="Remember Me"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSignIn}
                            style={{ marginTop: '1rem' }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end" style={{ marginTop: '1rem' }}>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default SignIn;
