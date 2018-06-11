import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class LoginScreen extends React.Component {
    _onSignInPress() {
        this.props.navigation.navigate('Dashboard');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{flex: 0.5}} />

                <View style={{flex: 0.4}}>
                    <TextInput style={styles.textInput} placeholder='Username' />
                    <TextInput style={styles.textInput} placeholder='Password' />

                    <TouchableOpacity style={styles.button} onPress={() => {this._onSignInPress()}}>
                        <Text style={{fontSize: 18}}>Login</Text>
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
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 20,
    },
    button: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: 'steelblue',
        borderRadius: 10
    }
});
