import { useState, useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.jsx'
import FormInput from '../form-input/form-input.js'
import './sign-in-form.scss'
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.js';
import { UserContext } from "../../contexts/user-context.js";

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const { setCurrentUser } = useContext(UserContext);

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
        setCurrentUser(user)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('wrong password');
                    break;
                case 'auth/user-not-found':
                    alert('user not found');
                    break;
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            {/* <button type="button" onClick={test()}>Click</button> */}
            <form onSubmit={(event) => { handleSubmit(event); }}>

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
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;