import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './LoginForm.module.scss';
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";

const LoginForm = () => {
    let navigate = useNavigate();

    const [submittingForm, setSubmittingForm] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const validate = (formData) => {
        setFormErrors({
            email: 'Please try again with a valid email.'
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setSubmittingForm(true);

        const formData = new FormData();
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);

        // validate(formData);

        // submit data
        try {
            let res = await fetch("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", {
                method: "POST",
                body: formData,
            });
            let resJson = await res.json();
            if (res.status === 200) {
                console.log(resJson);
                navigate('/todoList')

            } else {
                console.log('An error occurred')
            }
        } catch (err) {
            console.log(err);
        }

        setSubmittingForm(false);
    }

    return (
        <div className={classes.formContainer}>
            <form id='login' onSubmit={(e) => handleSubmitForm(e)}>
                <div className={classes.formItem}>
                    <div className={classes.labelContainer}>
                        <label>Email</label>
                    </div>
                    <div className={classes.inputContainer}>
                        <BsFillPersonFill className={classes.icon} />
                        <input
                            type='email'
                            name='email'
                            autoComplete='off'
                            placeholder='user@rapptrlabs.com'
                            maxLength={50}
                            required
                            className={formErrors?.email ? classes.invalidEmail : ''}
                        />
                    </div>
                    <span className={classes.errorText}>
                        {formErrors?.email}
                    </span>
                </div>
                <div className={classes.formItem}>
                    <div className={classes.labelContainer}>
                        <label>Password</label>
                    </div>
                    <div className={classes.inputContainer}>
                        <BsFillLockFill className={classes.icon} />
                        <input
                            type='password'
                            name='password'
                            autoComplete='off'
                            placeholder='Must be at least 4 characters'
                            minLength={4}
                            maxLength={16}
                            required
                        />
                    </div>
                </div>
                <div className={classes.loginBtn}>
                    <button className={submittingForm ? classes.disabledBtn : ''} disabled={submittingForm} form='login'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;