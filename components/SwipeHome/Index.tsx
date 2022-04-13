import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import { AuthContext } from '../../App';
import { testtoken } from '../../services/test';

function SwipeHome() {
    const { state: authState } = React.useContext(AuthContext);

    const onrender = () => {
        testtoken(authState.token)
    }
    useEffect(() => {
        console.log("Te")
        onrender()
    }, [])



    return (
        <Text>Index</Text>
    )
}

export default SwipeHome