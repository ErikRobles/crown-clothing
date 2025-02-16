import {useState, ChangeEvent, FormEvent} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import { UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-up-form.styles.scss'

interface FormFields {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const defaultFormFields: FormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit =  async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords do not match!\nPlease try again.");
            return;
        }
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            if (response) {
                const {user} = response as UserCredential;
                await createUserDocumentFromAuth(user, {displayName});
                resetFormFields();
            }
        } catch (error) {
            if(error instanceof FirebaseError && error.code == 'auth/email-already-in-use') {
                alert('Cannot create user. Email already in use.');
                return;
            } else {
                console.log('User creation encountered an error', error)
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
    }

  return (
    <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit} >
            <FormInput 
                label="Display Name"
                type="text"
                required
                onChange={handleChange}
                name="displayName"
                value={displayName}
            />
            <FormInput
                label="Email"
                type="email"
                required
                onChange={handleChange}
                name="Email"
                value={email}
           />
            <FormInput 
                label="Password"
                type="password"
                required
                onChange={handleChange}
                name="Password"
                value={password}
            />
            <FormInput 
                label="Confirm Password"
                type="password"
                required
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
            />
            <Button type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm;