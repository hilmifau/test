import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { fetchContacts, fetchContact, createContact, deleteContact, updateContact } from '../redux/action/action';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DimHeight, DimWidth } from "../helpers/size";
import { showSnackBar } from "../helpers/snackBar";
import type { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  PermissionsAndroid,
  Pressable,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import { ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";

export const ContactUpdate = (props: any) => {
  const dispatch = useDispatch();
  const { route, navigation, contactDetail } = props;
  const [firstName, onChangeFirstName] = React.useState('');
  const [lastName, onChangeLastName] = React.useState('');
  const [age, onChangeAge] = React.useState('');
  const [image, setImage] = React.useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isNew, setIsNew] = useState(route.params)

  useEffect(()=> {
    if (isNew) {
      fetchContact(route.params.id);
      onChangeFirstName(contactDetail.firstName)
      onChangeLastName(contactDetail.lastName)
      setImage(contactDetail.photo)
    }
    
  }, [])

  const requestCameraPermission = async ( type: any, options: any) => {
    setModalVisible(!modalVisible);
    try {
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.CAMERA,
      //   {
      //     title: "App Camera Permission",
      //     message:"App needs access to your camera ",
      //     buttonNeutral: "Ask Me Later",
      //     buttonNegative: "Cancel",
      //     buttonPositive: "OK"
      //   }
      // );
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
      )
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      if (granted['android.permission.CAMERA'] && granted['android.permission.WRITE_EXTERNAL_STORAGE']) {
        console.log("Camera permission given");
        if (type === 'capture') {
          launchCamera(options, (res) => {
            if (res.didCancel) {
              console.log('cancelled');
            } else if (res.errorCode) {
              console.log(res.errorMessage);
            } else {
              const data = res.assets
              if(data) {
                data.forEach((img) => {
                  setImage(img.uri);
                })
              }
            }
          });
        } else {
          launchImageLibrary(options, (res) => {
            if (res.didCancel) {
              console.log('cancelled');
            } else if (res.errorCode) {
              console.log(res.errorMessage);
            } else {
              const data = res.assets
              if(data) {
                data.forEach((img) => {
                  setImage(img.uri);
                })
              }
            }
          });
        }
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const submitHandler = () => {
    if (typeof firstName === 'undefined' || firstName === null || firstName.trim() === '' ||
        typeof lastName === 'undefined' || lastName === null || lastName.trim() === '' ||
        typeof age === 'undefined' || age === null || age.trim() === '' ||
        typeof image === 'undefined' || image === null || image.trim() === ''
    ) {
      showSnackBar('Data Tidak Boleh Kosong', 'mandatory');
    } else {
      if(!isNew) {
        const payload = {
          firstName,
          lastName,
          age,
          photo: image
        }
        createContact( dispatch ,payload);
      } else {
        const payload = {
          firstName,
          lastName,
          age,
          photo: image
        }
        updateContact(dispatch, payload, contactDetail.id);
      }
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {actions.map(({title, type, options}) => {
            return (
              <TouchableOpacity
                key={title}
                onPress={() => requestCameraPermission(type, options)}>
                <Text style={styles.modalText}>{title}</Text>
              </TouchableOpacity>
            );
          })}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <FontAwesome
                name="times"
                size={20}
                color="#262626"
              />
            </Pressable>
          </View>
        </View>
      </Modal>
      <GestureHandlerRootView>
        <ScrollView>
          <View style={{backgroundColor: "white", paddingTop: DimHeight(6)}}>
            <View style={styles.pictureContainer}>
              {
                image != null ? 
                  <View style={styles.pictureContainer}>
                    <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Image 
                        style={styles.picture} 
                        source={{ uri: image}}
                      />
                    </TouchableOpacity>
                  </View> 
                : 
                  <TouchableOpacity 
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <FontAwesome
                      name="camera"
                      size={80}
                      color="#262626"
                    />
                  </TouchableOpacity>
              }
            </View>
            <View style={{ paddingHorizontal: DimWidth(5), paddingTop: DimWidth(8) }}>
              <View style={{ flexDirection: 'row', paddingBottom: DimHeight(1)}}>
                <FontAwesome
                  name="user"
                  size={20}
                  color="#014c75"
                />
                <Text style={styles.formLabel}>First Name</Text>
              </View>
              <TextInput
                style={styles.formInput}
                onChangeText={onChangeFirstName}
                value={firstName}
              />
            </View>
            <View style={{ paddingHorizontal: DimWidth(5), paddingTop: DimWidth(8) }}>
              <View style={{ flexDirection: 'row', paddingBottom: DimHeight(1)}}>
                <FontAwesome
                  name="user"
                  size={20}
                  color="#014c75"
                />
                <Text style={styles.formLabel}>Last Name</Text>
              </View>
              <TextInput
                style={{ ...styles.formInput}}
                onChangeText={onChangeLastName}
                value={lastName}
              />
            </View>
            <View style={{ paddingHorizontal: DimWidth(5), paddingTop: DimWidth(8) }}>
              <View style={{ flexDirection: 'row', paddingBottom: DimHeight(1)}}>
                <FontAwesome5
                  name="birthday-cake"
                  size={20}
                  color="#014c75"
                />
                <Text style={styles.formLabel}>Age</Text>
              </View>
              <TextInput
                style={{ ...styles.formInput}}
                onChangeText={onChangeAge}
                value={age}
                keyboardType="numeric"
              />
            </View>
            <View style={{ paddingHorizontal: DimWidth(5), paddingVertical: DimWidth(9) }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ padding: DimWidth(2.5), alignItems: "center", backgroundColor: '#014c75', borderRadius: DimWidth(2), elevation: 1, }}
                onPress={() => {submitHandler()}} 
              >
                <Text style={{ fontSize: DimWidth(3.8), fontWeight: 'bold', color: 'white' }}>Save Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'black'
  },
  pictureContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  formLabel: { 
    fontSize: DimWidth(4),
    paddingLeft: DimWidth(3),
    color: 'black',
    marginBottom: DimHeight(1)
  },
  formInput: { 
    elevation: 7,
    fontSize: DimWidth(4), 
    padding: DimWidth(3), 
    height: DimHeight(7),
    color: "black", 
    // borderBottomWidth: 1,
    // borderBottomColor: "grey",
    borderRadius: 10,
    backgroundColor: '#eeeeee'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F9F5F6',
    borderRadius: 20,
    padding: DimWidth(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 9,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },
  buttonClose: {
    position: 'absolute',
    alignSelf: 'flex-end'
  },
  modalText: {
    borderRadius: 10,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: DimWidth(5)
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take photo',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
  {
    title: 'Choose photo',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take photo',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'mixed',
      presentationStyle: 'fullScreen',
    },
  });
}

const mapStateToProps = ({ contactReducer } : any) => ({
  contactDetail: contactReducer.contact
});

const mapDispatchToProps = {
  fetchContacts,
  fetchContact,
  createContact,
  deleteContact,
  updateContact
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUpdate);
