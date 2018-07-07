import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {
    ListItem, Left, Body,
    Thumbnail, Text
} from 'native-base';

const arrayColorAvatar = ['rgb(244, 67, 54)', 'rgb(103, 58, 183)', 'rgb(63, 81, 181)',
    'rgb(33, 150, 243)', 'rgb(76, 175, 80)', 'rgb(96, 125, 139)', 'rgb(0, 150, 136)'];

export default class ContactItem extends Component {

    // componentWillMount(){

    //      console.log(JSON.stringify(this.props));
    // }

    constructor(props) {
        super(props);
    }

    _loadNumber() {
        {
            try {
                // console.log(this.props.value[0].item.phoneNumbers[0].number);
                return this.props.value[0].item.phoneNumbers[0].number;
            } catch (error) {
                return "Không có số điện thoại";
            }
        }
    }

    _loadName() {
        {
            try {
                // console.log(this.props.value[0].item.phoneNumbers[0].number);

                var givenName = (this.props.value[0].item.givenName != null) ? this.props.value[0].item.givenName : "";
                var familyName = (this.props.value[0].item.familyName != null) ? this.props.value[0].item.familyName : "";
                var middleName = (this.props.value[0].item.middleName != null) ? this.props.value[0].item.middleName : "";

                return givenName + " " +
                    familyName + " " +
                    middleName + " ";
            } catch (error) {
                console.log("error");
            }
        }
    }

    _loadAvatar() {
        {
            try {
                // console.log(this.props.value[0].item);
                return (this.props.value[0].item.thumbnailPath == "") ? "" : this.props.value[0].item.thumbnailPath;
            } catch (error) {
                return "";
            }
        }
    }

    ImageAvatar() {
        // return Tag images
        if (this._loadAvatar() == "") {
            return (<View style={styles.imagesAvatar}>
                <Text style={[styles.imagesAvatarText]}>
                    {this._loadName().substr(0, 1).toUpperCase()}
                </Text>
            </View>);
        }
        return <Thumbnail source={{ uri: this._loadAvatar() }} />;
    }

    _dataMovingDetailContact = () => {
        // send data to contact detail

        var data = [
            {
                'contactItem': this.props.value[0].item,
                'phone': this._loadNumber(),
                'name': this._loadName(),
                'avatar': this._loadAvatar(),
            }
        ]
        // console.log(data);

        this.props.value[1].navigate('detail', data);
    }

    render() {
        return (
            <ListItem noBorder button avatar onPress={this._dataMovingDetailContact}>
                <Left>
                    {this.ImageAvatar()}
                </Left>
                <Body>
                    <Text>{this._loadName()}</Text>
                    <Text note>{this._loadNumber()}</Text>
                </Body>
            </ListItem>
        );
    }
}
const paddingSizeIOS = Platform.OS === 'ios' ? 10 : 0;

var styles = StyleSheet.create({
    ListItem: {
        borderBottomWidth: 0,
        borderWidth: 0,
        marginTop: paddingSizeIOS,
        marginBottom: paddingSizeIOS,
    },
    imagesAvatar: {
        backgroundColor: 'rgb(63, 81, 181)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    imagesAvatarText: {
        color: "white",
    },



});
