import React, {Fragment, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import colors from '../../resource/colors';
import Strings from '../../resource/Strings';
import IconBack from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as getUserListActionCreator from '../../redux/action/getUserListAction';
import styles from './styles';
const Details = props => {
  useEffect(() => {
    console.log('Item Data: ', props.navigation.getParam('item', null));
    // console.log('Image URI: ', props.navigation.getParam('item', null).img);
  }, []);

  const renderTitleBar = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.titleBarView}>
        <IconBack style={styles.searchIcon} size={27} name="arrow-back" />
      </TouchableOpacity>

      <View style={styles.titleBarViewMiddle} />
      <View style={styles.titleBarView}>
        <Image
          style={styles.imageTitle}
          source={require('../../assets/images/heart_filled.png')}
        />
      </View>
    </View>
  );

  const contentView = () => {
    let info=props.navigation.getParam('item', null);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            source={{uri: info.picture.large}}
            style={styles.bgPhotoStyle}
          />

          <LinearGradient
            colors={colors.linearGradientDefault}
            start={{x: 0, y: 0}}
            style={styles.linearGradient}
            end={{x: 0, y: 1}}
          />
        </View>

        <View style={styles.viewContent}>
          {renderTitleBar()}
          <Image
            source={{uri: info.picture.large}}
            style={styles.userImage}
          />

          <Text style={styles.userNameText}>
          {info.name.title} {info.name.first} {info.name.last}
          </Text>
          <Text style={styles.userNicknameText}>
            {info.email}
          </Text>
          <Text style={styles.userStatusText}>
            {"Cell: "+info.cell}
          </Text>
          <View style={styles.textContentView}>
            <View style={styles.subSectionView}>
              <Text style={styles.userLabelText}>{Strings.gender}</Text>
              <Text style={styles.userValueText}>
              {info.gender}
              </Text>
            </View>

            <View style={styles.birthDayContentView}>
              <View style={styles.viewBirthDate}>
                <Text style={styles.userValueText}>
                  {moment(
                    info.dob.date,
                    'YYYY/MM/DD',
                  ).format('DD-MMMM-YYYY')}
                </Text>
                <IconFeather style={styles.birthIcon} size={24} name="gift" />
              </View>
            </View>
          </View>

          <View style={styles.countryView}>
            <View style={styles.subSectionView}>
              <Text style={styles.userLabelText}>
                {Strings.country}
              </Text>
              <Text style={styles.userValueText}>
                {info.location.country}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaView} />
      <SafeAreaView style={styles.safeAreaSubView}>
        <StatusBar
          hidden={true}
          backgroundColor={colors.black}
          barStyle="light-content"
        />

        <ScrollView>
          <View style={styles.scrollSubView}>{contentView()}</View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  getUserActions: bindActionCreators(
    getUserListActionCreator,
    dispatch,
  ),
});

const mapStateToProps = state => ({
  isLoading: state.getUserListReducer.isLoading,
  getUserListData: state.getUserListReducer.getUserListData,
  favouritesArray: state.getFavouritesActionReducer.favouritesArray,
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
