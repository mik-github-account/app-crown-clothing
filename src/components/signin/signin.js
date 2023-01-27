import {
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.js';

const Signin = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user)
    };

    return (
        <>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>SignIn with Google</button>
        </>
    );
};

export default Signin;