import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* section 1 */}
                <View style={styles.sectionOne}>
                    <Text style={{fontSize: 20, color: '#fff',}}>Your Balance</Text>
                    <Text style={{fontSize: 24, color: '#f0f2a4'}}>{new Intl.NumberFormat().format(this.state.user.balance)}</Text>

                    <TouchableOpacity style={styles.button} onPress={() => {this._onSignInPress()}}>
                        <Text style={{fontSize: 18, color: '#fff'}}>1 Active Bet</Text>
                    </TouchableOpacity>
                </View>

                {/* section 2 */}
                <View style={styles.sectionTwo}>
                    {/* American Football Card */}
                    <TouchableOpacity style={styles.card} onPress={() => {console.log('American Football')}}>
                        <View style={{flex: 1, alignSelf: 'stretch',}}>
                            <Image
                                style={styles.image}
                                source={{uri: 'http://megacable.blog/wp-content/uploads/2014/09/nfl.jpg'}}
                                onPress={() => {console.log('American Football')}}
                            />
                            <View style={styles.textContainer}>
                                <Text>American Football</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* UFC / MMA */}
                    <TouchableOpacity style={styles.card} onPress={() => {console.log('UFC / MMA')}}>
                        <View style={{flex: 1, alignSelf: 'stretch',}}>
                            <Image
                                style={styles.image}
                                source={{uri: 'http://www.logo-designer.co/wp-content/uploads/2015/07/UFC-logo-design-2015-brand-identity.png'}}
                            />
                            <View style={styles.textContainer}>
                                <Text>UFC / MMA</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>

                {/* Partner section */}
                <View style={styles.sectionThree}>
                    <Text style={styles.partnerText}>10% of commissions are donated</Text>
                    <View style={styles.partnerImageContainer}>
                        <Image 
                            style={styles.partnerImage}
                            source={{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/American_Red_Cross_logo.svg/1200px-American_Red_Cross_logo.svg.png'}}
                            resizeMode="contain"
                        />
                    </View>
                </View>

            </View>
        );
    }

    componentDidMount() {
        const { navigation } = this.props;

        if (navigation.getParam('user')) {
            this.setState({user: navigation.getParam('user')})
        } else {
            const testData = {
                first_name: 'test',
                email: 'test@gmail.com',
                password: 'password',
                balance: '1234.56'
            };

            this.setState({user: testData});
        }

        setTimeout(() => {
            console.log(this.state.user);
        }, 1000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionOne: {
        flex: 1,
        padding: 50,
        backgroundColor: '#57585b',
        // backgroundColor: '#f0f2a4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#4285f4',
        borderRadius: 10
    },
    sectionTwo: {
        flex: 4,
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 30,
        // backgroundColor: '#57585b',
        backgroundColor: '#f0f2a4',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        flex: 0.45,
        height: 110,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    textContainer: {
        padding: 5,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    sectionThree: {
        flex: 1,
        backgroundColor: '#f0f2a4',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 40
    },
    partnerImageContainer: {
        backgroundColor: '#fff',
        flex: 0.6,
        width: 200,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    partnerText: {
        flex: 0.4,
        fontSize: 16,
        textAlign: 'center',
        color: '#AC3931'
    },
    partnerImage: {
        flex: 1,
        margin: 10,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    }
});
