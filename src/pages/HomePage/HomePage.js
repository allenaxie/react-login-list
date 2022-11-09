import React, {useState} from 'react';
import classes from './HomePage.module.scss';
import { LoginForm } from '../../components';

export default function HomePage () {
    const [loginPageVisible, setLoginPageVisible] = useState(true);

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Rapptr Labs</h1>
            <LoginForm />

        </div>
    )
}

