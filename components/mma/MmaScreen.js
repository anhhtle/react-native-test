import React from 'react';
import { StyleSheet, View, ListView, Text, Image, TouchableOpacity, TouchableHighlight, Modal, TextInput } from 'react-native';

export default class MmaScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            modalVisible: false,
            modalEvent: {},
            modalFighterNumber: null,
            modalFighterName: '',
            modalFighterOdd: null,
            risk: '10.00',
            winning: null,
        };
    }
    
    processDataSource() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ds.cloneWithRows(this.state.dataSource);
    }

    formatDate(dateTime) {
        let dateStr = new Date(dateTime.replace(/ /g,"T") + 'Z');
        let date = dateStr.toLocaleDateString();
        let time = dateStr.toLocaleTimeString();
        return date + ' ' + time;
    }

    showModal(event, fighterNumber) {
        let fighterName, fighterOdd;

        fighterName = fighterNumber === 1 ? event.fighter_one : event.fighter_two;
        fighterOdd = fighterNumber === 1 ? event.fighter_one_odd : event.fighter_two_odd;

        this.setState({modalVisible: true, modalEvent: event, modalFighterNumber: fighterNumber, modalFighterName: fighterName, modalFighterOdd: fighterOdd});
    }

    handleRiskInput(text) {
        // this.setState({text});

        // let newText = '';
        // let numbers = '0123456789';

        // for (var i = 0; i < text.length; i++) {
        //     if ( numbers.indexOf(text[i]) > -1 ) {
        //         newText = newText + text[i];
        //     }
        // }   
        // this.setState({risk: newText})
        // console.log(newText);

        console.log(text)
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    >

                    <View style={styles.modalOverlay}>
                        <View style={styles.modal}>
                            <Text style={styles.title}>{this.state.modalEvent.event_title}</Text>
                            <View style={styles.modalFighter}>
                                <Text style={styles.fighterText}>{this.state.modalFighterName}</Text>
                                <Text style={styles.fighterText}>{this.state.modalFighterOdd}</Text>
                            </View>

                            <TouchableHighlight onPress={() => { this.setState({modalVisible: false}) }} >
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.form}>
                            <View style={{flex: 1, marginRight: 5}}>
                                <Text style={{marginBottom: 5}}>Risk</Text>
                                <TextInput 
                                    style={styles.riskInput}
                                    keyboardType='numeric'
                                    onChange={(text) => this.handleRiskInput(text)}
                                    // value={this.state.risk}
                                />
                            </View>

                            <View style={{flex: 1}}>
                                <Text style={{marginBottom: 5}}>Winning</Text>
                                <TextInput 
                                    style={styles.winningInput}
                                    editable={false}
                                    value={this.state.risk}
                                />
                            </View>
                        </View>

                    </View>

                </Modal>

                <Text style={styles.upcoming}>UPCOMING</Text>
                <ListView
                    dataSource={this.processDataSource()}
                    enableEmptySections={true}
                    renderRow={(rowData) => (
                        <View style={styles.listItemContainer}>
                            <Image 
                                style={styles.cardImage}
                                source={{uri: rowData.image}}
                            />
                            <View style={styles.cardDetail}>
                                <Text style={styles.time}>{this.formatDate(rowData.time)}</Text>

                                <View style={styles.touchableContainer}>
                                    <TouchableOpacity style={styles.touchable} onPress={() => { this.showModal(rowData, 1) }}>
                                        <Text style={styles.fighterText}>{rowData.fighter_one}</Text>
                                        <Text style={styles.fighterText}>{rowData.fighter_one_odd >= 0 ? '+' + rowData.fighter_one_odd : rowData.fighter_one_odd}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.touchable} onPress={() => { this.showModal(rowData, 2) }}>
                                        <Text style={styles.fighterText}>{rowData.fighter_two}</Text>
                                        <Text style={styles.fighterText}>{rowData.fighter_two_odd >= 0 ? '+' + rowData.fighter_two_odd : rowData.fighter_two_odd}</Text>
                                    </TouchableOpacity>

                                </View>
                                <Text style={styles.title}>{rowData.event_title}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }

    componentDidMount() {
        let testData = [
            {
                id: 1,
                fighter_one: 'Fighter One',
                fighter_one_odd: -100,
                fighter_two: 'Fighter Two',
                fighter_two_odd: 150,
                event_title: 'TEST TITLE 1',
                image: 'http://c3.thejournal.ie/media/2013/09/ufc-fight-night-boston-3-390x285.jpg',
                time: '2018-08-19 00:00:00',
                status: 0,
                winner: null
            }, {
                id: 2,
                fighter_one: 'Fighter A',
                fighter_one_odd: 300,
                fighter_two: 'Fighter B',
                fighter_two_odd: -450,
                event_title: 'TEST TITLE 2',
                image: 'https://signalscv.com/wp-content/uploads/2017/06/Vinc-Pichel-2-web.jpg',
                time: '2018-08-29 02:30:00',
                status: 0,
                winner: null
            }
        ];

        this.setState({dataSource: testData});

        // setTimeout(() => {
        //     console.log(this.state.dataSource[0]['event_title']);
        // }, 400);
    }
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#57585b',
        backgroundColor: '#f0f2a4',
        paddingVertical: 50,
        paddingHorizontal: 15
    },
    upcoming: {
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray',
    },
    listItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    cardImage: {
        flex: 2,
        alignSelf: 'stretch',
        width: null,
        height: null
    },
    cardDetail: {
        flex: 5,
        paddingHorizontal: 5
    },
    time: {
        marginBottom: 5,
        color: 'gray',
        fontSize: 12,
    },
    touchableContainer: {
        // flexDirection: 'row',
        // marginBottom: 5
    },
    touchable: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        backgroundColor: '#388697',
        padding: 5,
    },
    fighterText: {
        color: '#fff',
        fontSize: 12,
    },
    title: {
        fontSize: 12,
        marginBottom: 5
    },
    modalOverlay: {
        paddingTop: 100,
        paddingHorizontal: 30,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0,0.5)', 
    },
    modal: {
        backgroundColor: '#fff',
        padding: 10,
    },
    modalFighter: {
        backgroundColor: '#388697',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    form: {
        flexDirection: 'row',
        backgroundColor: '#f0f2a4',
        padding: 10,
    },
    riskInput: {
        backgroundColor: '#fff',
        width: 100,
        padding: 5,
        color: '#000',
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'right',
    },
    winningInput: {
        backgroundColor: 'lightgrey',
        width: 100,
        padding: 5,
        color: '#000',
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'right',
    }
});