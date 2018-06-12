import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email :'',
            validated: false ,
        }
    };

    _onSignInPress() {
        this.props.navigation.navigate('Dashboard');
    }

    _validateEmail() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({email:text})
            return false;
        } else {
            this.setState({email:text})
            console.log("Email is Correct");
            return true;
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{flex: 0.5}} />

                <View style={{flex: 0.4}}>
                    <TextInput style={styles.textInput} placeholder='Username' keyboardType='email-address'/>
                    <TextInput style={styles.textInput} placeholder='Password' secureTextEntry={true}/>

                    <TouchableOpacity style={styles.button} onPress={() => {this._onSignInPress()}}>
                        <Text style={{fontSize: 20, color: '#fff'}}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 0.1}}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#f0f2a4',
    },
    textInput: {
        height: 40,
        marginBottom: 20,
        paddingBottom: 10,
        paddingLeft: 10,
        borderBottomColor: '#AC3931',
        borderBottomWidth: 2,
        fontSize: 20,
        color: '#AC3931',
    },
    button: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#4285f4',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    }
});
