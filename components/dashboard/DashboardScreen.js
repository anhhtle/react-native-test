import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class DashboardScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/* section 1 */}
                <View style={styles.sectionOne}>
                    <Text style={{fontSize: 20, color: '#fff',}}>Your Balance</Text>
                    <Text style={{fontSize: 24, color: '#f0f2a4'}}>$1,000</Text>
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
            </View>
        );
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
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'steelblue',
        borderRadius: 10
    },
    sectionTwo: {
        flex: 3,
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
});
