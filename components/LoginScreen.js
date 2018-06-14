import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';


export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            email:'',
            password: '',
            LoginOrSignUp: 'Login',
            showErrorMessage: false,
            errorMessage: ''
        }
    };

    toggleLogin() {
        if (this.state.LoginOrSignUp === 'Sign-up') {
            this.setState({LoginOrSignUp: 'Login', showErrorMessage: false, errorMessage: ''});
        } else {
            this.setState({LoginOrSignUp: 'Sign-up'});
        }
    }

    async getStorageEmail() {
        try {
            let email = await AsyncStorage.getItem('email', null);
            if (email !== null) {
                this.setState({email})
            } else {
                console.log('no email saved in storage');
            }
        } catch (error) {
            console.log(error);
        } 
    }

    onSubmit() {
        if (this.state.LoginOrSignUp === 'Login') {
            if (this.state.email === '' || this.state.password === '') {
                this.setState({showErrorMessage: true, errorMessage: 'Please fill out all fields'});
            } else {
                this.loginClient();
            }
        } else {
            if (this.state.first_name === '' || this.state.email === '' || this.state.password === '') {
                this.setState({showErrorMessage: true, errorMessage: 'Please fill out all fields'});
            } else if (!this.validateEmail()) {
                this.setState({showErrorMessage: true, errorMessage: 'Please enter a valid email'});
            } else {
                this.createClient();
            }
        }
    }
    
    loginClient() {
        let data = {
            email: this.state.email,
            password: this.state.password
        };
    
        fetch('http://laravel-api.test/api/client/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.status === 404) {
                throw 404;
            }
            return response.json()
        })
        .then((responseJson) => {
            

            AsyncStorage.setItem('email', responseJson.data.email);
            this.props.navigation.navigate('Dashboard', {client: responseJson.data});
        })
        .catch((error) => {
            if (error === 404) {
                this.setState({showErrorMessage: true, errorMessage: 'User not found'});
            } else {
                console.log(error);
            }
        });
    }
    
    createClient() {
        let data = {
            firstName: this.state.first_name,
            email: this.state.email,
            password: this.state.password
        }
    
        fetch('http://laravel-api.test/api/client/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.status === 409) {
                // duplicate email
                throw 409;
            }
            return response.json()
        })
        .then((responseJson) => {
            // console.log(responseJson);

            
            AsyncStorage.setItem('email', responseJson.data.email);
            this.props.navigation.navigate('Dashboard', {client: responseJson.data});
        })
        .catch((error) => {
            if (error === 409) {
                this.setState({showErrorMessage: true, errorMessage: 'Email already registered'});
            } else {
                console.error(error);
            }
        });
    }

    validateEmail() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        if (reg.test(this.state.email) === false) {
            return false;
        } else {
            return true;
        }
    }

    renderNameInput() {
        if (this.state.LoginOrSignUp === 'Sign-up') {
            return (
                <TextInput style={styles.textInput} onChangeText={(first_name) => this.setState({first_name})} placeholder='First Name' keyboardType='email-address' />
            );
        } else {
            return null;
        }
    }

    renderSignUpError() {
        if (this.state.showErrorMessage) {
            return (<Text style={styles.errorMessage}>{this.state.errorMessage}</Text>);
        } else {

        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{flex: 0.5}} />

                <View style={{flex: 0.4}}>
                    {this.renderSignUpError()}
                    {this.renderNameInput()}
                    <TextInput style={styles.textInput} onChangeText={(email) => this.setState({email})} placeholder='Email' value={this.state.email} keyboardType='email-address'/>
                    <TextInput style={styles.textInput} onChangeText={(password) => this.setState({password})} value={this.state.password} placeholder='Password' secureTextEntry={true}/>

                    <TouchableOpacity style={styles.button} onPress={() => {this.onSubmit()}}>
                        <Text style={{fontSize: 20, color: '#fff'}}>{this.state.LoginOrSignUp}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.toggleLogin()}} >
                        <Text style={styles.signUp}>{this.state.LoginOrSignUp === 'Login' ? 'Sign-up' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 0.1}}/>

            </View>
        );
    }

    componentDidMount() {
        this.getStorageEmail();
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
        borderBottomWidth: 1,
        fontSize: 20,
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
    },
    signUp: {
        color: '#4285f4',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20
    },
    errorMessage: {
        color: '#b1040e',
        textAlign: 'center',
        marginBottom: 10
    }
});
