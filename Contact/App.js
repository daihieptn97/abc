/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  View, Image, Alert, Text,
  FlatList, PermissionsAndroid, TouchableOpacity, Dimensions
} from 'react-native';

console.disableYellowBox = true;

import ContactItem from "./component/ContactItem";
var Contacts = require('react-native-contacts');

import { Container, Content, List, Button, Icon, Right, Header } from 'native-base';
import SttBar from './component/STTBar';
import { createStackNavigator } from 'react-navigation';
import DetailContact from './Layout/DetailContact';
import CreateContact from './Layout/CreateContact';

import { Toolbar, ActionButton } from 'react-native-material-ui';

function _loadNameCompare(params) {
  {
    try {
      // console.log(this.props.value[0].item.phoneNumbers[0].number);

      var givenName = (params.givenName != null) ? params.givenName : "";
      var familyName = (params.familyName != null) ? params.familyName : "";
      var middleName = (params.middleName != null) ? params.middleName : "";

      return givenName + " " +
        familyName + " " +
        middleName + " ";
    } catch (error) {
      console.log("error");
    }
  }
}
function readContact(val) {
  try {
    console.log("Đã được cấp quyền !");
    Contacts.getAll((err, contacts) => {
      if (err) console.log("Loi doc danh ba : " + err);

      contacts.sort(function (a, b) {
        var nameA = _loadNameCompare(a).toUpperCase(); // ignore upper and lowercase
        var nameB = _loadNameCompare(b).toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      val.setState({
        FullContact: contacts,
        DataContact: contacts,
        SeacrhContact: contacts
      });

    });
  } catch (err) {
    console.log("Loi doc danh ba : " + err);
  }
}
async function requestPermission(val) {

  Contacts.checkPermission((err, permission) => {
    if (err) throw err;

    // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
    if (permission === 'undefined') {
      Contacts.requestPermission((err, permission) => {
        readContact(val);
      })
    } else {
      readContact(val);
    }
    if (permission === 'authorized') {
      console.log("permission === 'authorized'");

    }
    if (permission === 'denied') {
      console.log(permission === 'denied');

    }
  })


}
// type Props = {};

class HomeSceen extends Component {

  static navigationOptions = {
    header: null
  };

  async  componentWillMount() {
    await requestPermission(this);
  }

  constructor(props) {
    super(props);
    this.state = {
      DataContact: null,
      FullContact: null,
      SeacrhContact: null,

      per: false,
      refreshings: false,
      flagSearch: true,
      flagShowBtnAdd: 'block',

      toolOption: {
        opacity: 0,
        zIndex: -999,
      },
    }
  }
  _handlerToolbarOption = () => {

    if (this.state.toolOption.opacity == 0) {
      this.setState({
        toolOption: {
          opacity: 1,
          zIndex: 9999,
        }
      });
    } else {
      this.setState({
        toolOption: {
          opacity: 0,
          zIndex: -999,
        }
      });
    }
  }

  _onPressInfo = () => {
    Alert('Thong tin');
  }
  _onPressEdit = () => {
    var listNumber = this.state.DataContact;
    // console.log(phoneSwap);

    for (let i = 0; i < listNumber.length; i++) {
      try {
        // console.log(this.state.DataContact);
        // console.log(this.state.DataContact[0].phoneNumbers[0].number); // number
        // console.log(listNumber[i].phoneNumbers[0].number);
        var temp = listNumber[i].phoneNumbers[0].number;
        temp = this.replaceNumber(temp);
        console.log(temp);
        listNumber[i].phoneNumbers[0].number = temp;

      } catch (error) {
        console.log('empty number');
      }
    }


    this.setState(
      (val) => { return { DataContact: listNumber }; }
    );

    Contacts.updateContact(listNumber[0], (err) => {
      if (err) throw err;
    });
  }

  replaceNumber(number) {
    number = number.replace(/-/g, '');
    var firtNumber = number.substr(0, 4);
    // console.log(firtNumber);
    for (let i = 0; i < phoneSwap.length; i++) {
      if (firtNumber == phoneSwap[i].old) {
        // console.log(number + " == " + phoneSwap[i].new );
        number = number.replace(phoneSwap[i].old, phoneSwap[i].new);
        return number
      }
    }
    return number;
  }

  _onPressExportConacts = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn sao lưu danh bạ không  ?',
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            Alert.alert('Thông báo ^^| ', 'ok ! xong, tính năng chưa hoàn thành');
          }
        },
        {
          text: 'Hủy',
          onPress: () => { },
          style: 'cancel'
        }
      ]
    );
  }
  pullToList = () => {
    if (this.state.flagSearch) { // if flag check Sreach layout -> pull
      requestPermission(this);
    }
  }

  loadName(value) {
    {
      // get name contact
      // retrun string  Upper Case
      try {
        var givenName = (value.givenName != null) ? value.givenName : "";
        var familyName = (value.familyName != null) ? value.familyName : "";
        var middleName = (value.middleName != null) ? value.middleName : "";

        var name = givenName + " " +
          familyName + " " +
          middleName + " ";
        return name.toUpperCase();
      } catch (error) {
        console.log("error");
      }
    }
  }

  _handlerSearch = (event) => {
    var data = this.state.FullContact;
    var temp = [];
    event = event.trim().toUpperCase();
    for (let i = 0; i < data.length; i++) {
      try {
        if (this.loadName(data[i]).search(event) != -1) temp.push(data[i]);
      } catch (error) {
        console.log(data[i]);
      }
    }
    this.setState({
      DataContact: temp
    });
  }

  _handlerSearchClosed = () => {
    this.setState({
      flagSearch: true,
      DataContact: this.state.FullContact
    });


  }

  btnAddConact() {
    /* 
    * this.state.flagSearch = true  -> seacrh handler
    * @return : view button add
    *  */
    if (this.state.flagSearch) {
      return (
        <View>
          {/* <ActionButton icon="add" onPress={() => this.props.navigation.push('add')} /> */}
          <ActionButton icon="add" onPress={() => {
            var newPerson = {}
            Contacts.openContactForm(newPerson, (err) => {
              if (err) throw err;
              // form is open
            })

          }} />
        </View>
      )
    }
    return (
      <View>
        <ActionButton icon="add"
          style={{
            container: { display: 'none' }
          }}
        />
      </View>
    );

  }
  render() {
    return (
      <Container >

        <Header style={{ height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight, }} >
          <SttBar backgroundColor="#007ac1" />
        </Header>
        <ToolbarOptionSelect styleCustom={this.state.toolOption} />
        <Toolbar
          style={{
            container: {
              paddingTop: (Platform.OS === 'ios') ? 20 : 0,
              flexDirection: 'row',
            },
          }}
          centerElement="Danh bạ"
          searchable={{
            autoFocus: true,
            placeholder: 'Tìm kiếm liên hệ',
            onChangeText: this._handlerSearch,
            onSearchPressed: () => { this.setState({ flagSearch: false }) },
            onSearchClosed: this._handlerSearchClosed

          }}

          rightElement={
            <Button transparent onPress={this._handlerToolbarOption}>
              <Icon name="more" color="white" />
            </Button>
          }
          style={{ text: { color: 'white' } }}
        >
        </Toolbar>


        <FlatList
          onEndReachedThreshold={-1}
          style={{ flex: 1 }} extraData={this.state} data={this.state.DataContact}
          refreshing={this.state.refreshings}
          onRefresh={this.pullToList}
          renderItem={
            (item, ) => {
              return (
                <ContactItem value={[item, this.props.navigation]} />
              );
            }
          } />
        {this.btnAddConact()}
      </Container>
    );
  }
}

const screen = Dimensions.get('window');
const styles = StyleSheet.create({
  toolbarOptionContainer: {
    width: (screen.width / 3) + 10,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 78 : 85,
    right: 0,
    backgroundColor: "#ffffff",
  },
});


export default App = createStackNavigator({
  home: HomeSceen,
  detail: DetailContact,
  add: CreateContact
}, {
    initialRouteName: 'home'
  }
);


// toolbar option 
const ToolbarOptionSelect = ({ styleCustom }) => (

  <View style={[styles.toolbarOptionContainer,
  { opacity: styleCustom.opacity, zIndex: styleCustom.zIndex, }]}>
    <Button transparent>
      <Text style={{ flex: 1, marginLeft: 14, }}>Sửa đầu số</Text>
    </Button>
    <Button transparent>
      <Text style={{ flex: 1, marginLeft: 14, }}>Sao lưu</Text>
    </Button>
    <Button transparent>
      <Text style={{ flex: 1, marginLeft: 14, }}>Thông tin</Text>
    </Button>
  </View>
)