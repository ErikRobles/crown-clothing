import {useState, ChangeEvent, FormEvent} from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
// import { UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'

interface FormFields {
    email: string;
    password: string;
}

const defaultFormFields: FormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit =  async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
                const response = await signInAuthUserWithEmailAndPassword(email, password);
                console.log(response);
                resetFormFields();
           
        } catch (error) {
            if(error instanceof FirebaseError) {
               switch (error.code) {
                case 'auth/wrong-password':
                    alert("Wrong Password. Please Try again");
                    break;
                case 'auth/invalid-credential':
                    alert("Invalid email or password. Please Try again");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email.");
                    break;
                default:
                    console.log("Sign in encountered an error", error.code);  
               }
            } else {
                console.log('Sign In encountered an error', error)
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    }

  return (
    <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit} >
            <FormInput
                label="Email"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
           />
            <FormInput 
                label="Password"
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}
            />
            <div className="buttons-container">
                <Button buttonType='default' type="submit">Sign In</Button>
                <Button buttonType='google' type="button" onClick={signInWithGoogle}>Google Sign In</Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm;