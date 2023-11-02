import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountPage = () =>{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const createAccount = async() =>{
        try {
            if(password != confirmPassword){
                setError('password and confirm password do not match');
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
            
        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <>
            <h1>Create Account</h1>
            {error && <p className='error'>{error}</p>}
            <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email ...' required></input>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password ...' required></input>
            <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='re-enter Password ...' required></input>
            <button onClick={createAccount}>Create Account</button>
            <Link to='/login'>Already have an account? log In here</Link>
        </>
    );
}

export default CreateAccountPage;