import React, {Fragment, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as getUserListActionCreator from '../../redux/action/getUserListAction';
import * as getFavouritesActionCreator from '../../redux/action/getFavouritesAction';
import Icons from 'react-native-vector-icons/AntDesign';
import Strings from '../../resource/Strings';
import UserView from '../UserView';
import styles from './styles';
import colors from '../../resource/colors';

const Favourites = props => {
  useEffect(() => {
    //default search for blade movie
    // props.getUserActions.getUserListAction('');
  }, [props.getUserActions]);

  useEffect(() => {
    //get favourites
    props.getFavouritesActions.getFavouritesAction(0, false);
  }, []);

  const renderTitleBar = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleBarViewTitle}>
        <Text style={styles.headerTextStyle}>{Strings.favourites}</Text>
      </View>
      <View style={styles.titleBarView}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icons style={styles.searchIcon} size={30} name="close" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderUserItemView = item => (
    <UserView item={item} favouritesArray={props.favouritesArray} />
  );

  const getFavourites = favouritesList => {

    console.log("getFavourites: ",favouritesList)
    let dataArray = [];
    favouritesList.forEach(fav => {
      console.log("getFavourites:# favouritesArray: ",props.favouritesArrayl)
      console.log("getFavourites:# email: ",fav.email)
      if (props.favouritesArray.includes(fav.email)) {
        dataArray.push(fav);
      }
    });
    return dataArray;
  };
  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaView} />
      <SafeAreaView style={styles.safeAreaSubView}>
        <StatusBar
          hidden={false}
          backgroundColor={colors.black}
          barStyle="light-content"
        />

        {renderTitleBar()}
        <View style={styles.userSearchBarView}>
          <View style={styles.userContainerView}>
            <View style={styles.userListViewParent}>
              {getFavourites(
                    props.getUserListData !== undefined
                      ? props.getUserListData
                      : [],
                  ).length===0 ? (
                <Text style={styles.userNotAvailableText}>
                  {props.isLoading ? '' : Strings.no_fav_to_show}
                </Text>
              ) : (
                <FlatList
                  data={getFavourites(
                    props.getUserListData !== undefined
                      ? props.getUserListData
                      : [],
                  )}
                  numColumns={2}
                  alwaysBounceHorizontal={false}
                  bounces={false}
                  renderItem={({item}) => renderUserItemView(item)}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  getUserActions: bindActionCreators(
    getUserListActionCreator,
    dispatch,
  ),
  getFavouritesActions: bindActionCreators(
    getFavouritesActionCreator,
    dispatch,
  ),
});

const mapStateToProps = state => ({
  isLoading: state.getUserListReducer.isLoading,
  getUserListData: state.getUserListReducer.getUserListData,
  favouritesArray: state.getFavouritesActionReducer.favouritesArray,
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
