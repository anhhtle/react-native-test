import React from 'react';
import { StyleSheet, View, ListView, Text, Image } from 'react-native';

export default class MmaScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
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

    render() {
        return (
            <View style={styles.container}>
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
                                <Text>
                                    <Text>{rowData.fighter_one}</Text>
                                    <Text> V </Text>
                                    <Text>{rowData.fighter_two}</Text>
                                </Text>
                                <Text>{rowData.event_title}</Text>
                                <Text>{this.formatDate(rowData.time)}</Text>
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
                fighter_one_two: 150,
                event_title: 'TEST TITLE 1',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJuVs6AliCLOCboKNpla8SI5EKco960AmSLdJmU2uAEF4anYe4Ag',
                time: '2018-08-19 00:00:00',
                status: 0,
                winner: null
            }, {
                id: 2,
                fighter_one: 'Fighter A',
                fighter_one_odd: 300,
                fighter_two: 'Fighter B',
                fighter_one_two: -450,
                event_title: 'TEST TITLE 2',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJuVs6AliCLOCboKNpla8SI5EKco960AmSLdJmU2uAEF4anYe4Ag',
                time: '2018-08-29 02:30:00',
                status: 0,
                winner: null
            }
        ];

        this.setState({dataSource: testData});
    }
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2a4',
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    listItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    cardImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null
    },
    cardDetail: {
        flex: 3,
        padding: 10
    }
});