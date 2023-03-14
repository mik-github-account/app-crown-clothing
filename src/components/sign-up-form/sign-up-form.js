import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user-context.js";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.js';
import Button from '../button/button.jsx';
import FormInput from '../form-input/form-input.js'
import './sign-up-form.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('the passwords do not match')
            return;
        }

        if (password.length < 6) {
            alert('password is too short, it must be at least 6 characters')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields(defaultFormFields);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error: ', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={(event) => { handleSubmit(event); }}>

                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleChange}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={handleChange}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </div >
    );
};

export default SignUpForm;