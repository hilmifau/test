import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { fetchContacts, fetchContact, deleteContact, updateContact } from '../redux/action/action';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DimHeight, DimWidth } from "../helpers/size";

export const ContactDetail =(props: any) => {

  const { contactDetail, route, navigation } = props;

  useEffect(() => {
    getEntities();
  }, []);

  const getEntities = () => {
    props.fetchContact(route.params.id);
  };

  return (
    <View style={styles.container}>
      {
        Object.keys(contactDetail).length > 0 ? 
        <>
          <View>
          {
            contactDetail.photo.startsWith("file") ? 
            <View>
              <ImageBackground
              source={{ uri: contactDetail ? contactDetail.photo : "" }}
              style={{ ...styles.backgroundImage }}
              >

                <View style={styles.buttonEdit}>
                  <TouchableOpacity style={{ marginHorizontal: 20}}
                  >
                    <FontAwesome
                      name="star"
                      size={20}
                      color="white"
                      />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {navigation.navigate('ContactUpdate', { id: contactDetail.id})}}
                  >
                    <FontAwesome
                    name="pencil"
                    size={20}
                    color="white"
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            :
            <View style={{...styles.backgroundImage, backgroundColor: '#014c75'}}>          
            <View style={styles.buttonEdit}>
                  <TouchableOpacity style={{ marginHorizontal: 20}}
                  >
                    <FontAwesome
                      name="star"
                      size={20}
                      color="black"
                      />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {navigation.navigate('ContactUpdate', { id: contactDetail.id})}}
                  >
                    <FontAwesome
                    name="pencil"
                    size={20}
                    color="black"
                    />
                  </TouchableOpacity>
                </View>
            </View>
          }
          </View>
          <View style={styles.card}>
            <View style={{ top: DimHeight(3), }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.mainText}>{contactDetail.firstName + " " + contactDetail.lastName}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{ fontSize: 18, color: 'grey'}}>mobile</Text>
                <Text style={styles.mainPhone}>+62821-1221-2112</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{ fontSize: 18, color: 'grey', alignSelf: 'center'}}>age</Text> 
                <Text style={styles.mainAge}>{contactDetail.age}</Text>
              </View>
              <View style={styles.sim}>
                <FontAwesome5
                  name="sim-card"
                  size={15}
                  color="green"
                />
                <Text style={{ fontSize: 16, color: 'black'}}>Call with default : SIM 1</Text> 
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <FontAwesome5
                  style={styles.iconCall}
                  name="phone"
                  size={25}
                  color="#014c75"
                />
                <FontAwesome5
                  style={styles.iconCall}
                  name="video"
                  size={25}
                  color="#014c75"
                />
                <FontAwesome5
                  style={styles.iconCall}
                  name="sms"
                  size={25}
                  color="#014c75"
                />
              </View>
            </View>
          </View>
        </>
        :
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      }
    </View>
    // <View style={styles.container}>
    //   {
    //     Object.keys(contactDetail).length > 0 ? 
    //     <>
    //       <View>
    //       {
    //         contactDetail.photo.startsWith("http") || contactDetail.photo.startsWith("file") ? 
    //         <View>
    //           <ImageBackground
    //           source={{ uri: contactDetail ? contactDetail.photo : "" }}
    //           style={{ ...styles.backgroundImage }}
    //           >

    //             <View style={styles.buttonEdit}>
    //               <TouchableOpacity style={{ marginHorizontal: 20}}
    //               >
    //                 <FontAwesome
    //                   name="star"
    //                   size={20}
    //                   color="white"
    //                   />
    //               </TouchableOpacity>
    //               <TouchableOpacity onPress={() => {navigation.navigate('ContactUpdate', { id: contactDetail.id})}}
    //               >
    //                 <FontAwesome
    //                 name="pencil"
    //                 size={20}
    //                 color="white"
    //                 />
    //               </TouchableOpacity>
    //             </View>
    //           </ImageBackground>
    //         </View>
    //         :
    //         <View style={{...styles.backgroundImage, backgroundColor: '#014c75'}}>          
    //         <View style={styles.buttonEdit}>
    //               <TouchableOpacity style={{ marginHorizontal: 20}}
    //               >
    //                 <FontAwesome
    //                   name="star"
    //                   size={20}
    //                   color="black"
    //                   />
    //               </TouchableOpacity>
    //               <TouchableOpacity onPress={() => {navigation.navigate('ContactUpdate', { id: contactDetail.id})}}
    //               >
    //                 <FontAwesome
    //                 name="pencil"
    //                 size={20}
    //                 color="black"
    //                 />
    //               </TouchableOpacity>
    //             </View>
    //         </View>
    //       }
    //       </View>
    //       <View style={styles.card}>
    //         <View style={{ top: DimHeight(3), }}>
    //           <View style={{ flexDirection: 'row'}}>
    //             <FontAwesome
    //               style={styles.mainIcon}
    //               name="phone"
    //               size={20}
    //               color="#4cdd39"
    //             />
    //             <Text style={styles.mainText}>+62 821-1221-2112</Text>
    //             <View style={styles.buttonCall}>
    //               <FontAwesome5
    //                 style={styles.iconCall}
    //                 name="video"
    //                 size={20}
    //                 color="#4cdd39"
    //                 />
    //               <FontAwesome5
    //                 style={styles.iconCall}
    //                 name="sms"
    //                 size={20}
    //                 color="#014c75"
    //               />
    //             </View>
    //           </View>
    //           <View style={{borderWidth: 0.5, width: DimWidth(90), borderColor: '#999999', marginVertical: DimHeight(2), alignSelf: 'center', elevation: 5}} />
    //           <View style={{ flexDirection: 'row'}}>
    //             <FontAwesome
    //               style={styles.mainIcon}
    //               name="user"
    //               size={20}
    //               color="#014c75"
    //             />
    //             <Text style={styles.mainText}>{contactDetail.firstName + " " + contactDetail.lastName}</Text>
    //           </View>
    //           <View style={{borderWidth: 0.5, width: DimWidth(90), borderColor: '#999999', marginVertical: DimHeight(2), alignSelf: 'center', elevation: 5}} />
    //           <View style={{ flexDirection: 'row'}}>
    //             <FontAwesome5
    //               style={styles.mainIcon}
    //               name="birthday-cake"
    //               size={20}
    //               color="#832054"
    //             />
    //             <Text style={styles.mainText}>{contactDetail.age}</Text>
    //           </View>
    //         </View>
    //       </View>
    //     </>
    //     :
    //     <View style={{ flex: 1, justifyContent: 'center'}}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   }
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop : DimHeight(-3),
    elevation: 9,
    shadowColor: '#014c75',
  }, 
  backgroundImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height/3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainText:{
    paddingLeft: DimWidth(3),
    fontSize: DimWidth(9),
    color: '#262626',
    paddingVertical: DimHeight(1)
  },
  mainAge:{
    fontSize: DimWidth(6),
    color: '#262626',
    paddingLeft: DimWidth(2)
  },
  mainPhone:{
    fontSize: DimWidth(6),
    color: '#262626',
    paddingLeft: DimWidth(3)
  },
  mainIcon:{
    alignSelf: 'center',
    left: DimWidth(5),
    paddingRight: DimWidth(9),
  },
  iconCall:{
    alignSelf: 'center',
    paddingHorizontal: DimWidth(9),
    paddingVertical: DimWidth(9),
  },
  buttonEdit:{
    alignSelf: 'flex-end',
    bottom: DimHeight(6),
    right:DimWidth(7),
    flexDirection: 'row'
  },
  buttonCall:{
    position: 'absolute',
    top: DimHeight(1),
    right:DimWidth(7),
    display: 'flex',
    flexDirection: 'row'
  },
  sim : { 
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    backgroundColor: '#E2DFD2',
    width: DimHeight(30),
    marginTop: DimHeight(3),
    paddingVertical: DimHeight(1),
    borderRadius: 30

  }
})

const mapStateToProps = ({ contactReducer } : any) => ({
  contactDetail: contactReducer.contact
});

const mapDispatchToProps = {
  fetchContacts,
  fetchContact,
  deleteContact,
  updateContact
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetail);

