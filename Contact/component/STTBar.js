import React, { Component } from 'react';
import { StyleSheet, StatusBar, View , Platform} from 'react-native';
import { checkPermission } from 'react-native-contacts';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

export default class SttBar extends Component {
    checkOS(){
        if (Platform.OS === 'ios') {  
            <MyStatusBar
                barStyle="light-content"
            />
        }else{
            return (
                <MyStatusBar
                    backgroundColor="#007ac1"
                    barStyle="light-content"
                />
            );
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.checkOS()}
            </View>
        );
    }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({

    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: '#33373B',
    },
});


