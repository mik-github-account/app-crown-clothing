
import SignInForm from '../sign-in-form/sign-in-form.js';
import SignUpForm from '../sign-up-form/sign-up-form.js';
import './authentication.scss'

const Authentication = () => {

    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;