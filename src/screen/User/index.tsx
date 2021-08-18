import React, {Fragment, useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import IconSearch from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as getUserListActionCreator from '../../redux/action/getUserListAction';
import * as getFavouritesActionCreator from '../../redux/action/getFavouritesAction';
import styles from './styles';
import Strings from '../../resource/Strings';
import UserView from '../UserView';

import colors from '../../resource/colors';

const User = props => {
  const inputs = [];
  let favourite = [];
  let onEndReachedCalledDuringMomentum = false;
  
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    //default search for blade movie
    props.getUserActions.getUserListAction('', page);
  }, [props.getUserActions]);

  useEffect(() => {
    //get favourites
    props.getFavouritesActions.getFavouritesAction(0, false);
  }, []);

  const clearSearch = () => {
    inputs.textInput.clear();
    setIsSearchClick(false);
    setSearchValue('');
    props.getUserActions.getUserListAction('', page);
    Keyboard.dismiss();
  };
  const onFavouriteClick = async id => {
    console.log('FAVOURITE: ID: ', id);
    props.getFavouritesActions.getFavouritesAction(id, true);
  };

  const searchFilterFunction = searchTxt => {
    const n = searchTxt.length;

    setSearchValue(searchTxt);

    props.getUserActions.getUserListAction(searchTxt, page);
  };

  const renderTitleBar = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleBarViewTitle}>
        <Text style={styles.headerTextStyle}>{Strings.title}</Text>
      </View>
      <View style={styles.titleBarView}>
        <TouchableOpacity onPress={() => setIsSearchClick(!isSearchClick)}>
          <IconSearch style={styles.searchIcon} size={30} name="search" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Favourites')}>
          <Image
            style={styles.imageTitle}
            source={require('../../assets/images/heart_filled.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.userViewSearchBarContainer}>
      <TextInput
        style={styles.searchTextInput}
        keyboardType="ascii-capable"
        autoCapitalize="none"
        maxLength={20}
        placeholder={Strings.search_by}
        selectionColor={colors.blue}
        underlineColorAndroid="transparent"
        placeholderTextColor={colors.grey}
        accessible
        blurOnSubmit
        ref={input => {
          inputs.textInput = input;
        }}
        onChangeText={query => searchFilterFunction(query)}
      />
      {isSearchClick ? (
        <TouchableOpacity onPress={() => clearSearch()}>
          <Icons style={styles.searchIcon} size={20} name="close" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );

  const itemOnClick = item => {
    props.navigation.navigate('Details', {item});
  };

  const renderUserItemView = item => (
    <UserView
      item={item}
      itemOnClick={() => itemOnClick(item)}
      onFavouriteClick={() => onFavouriteClick(item.email)}
      favouritesArray={props.favouritesArray}
    />
  );

    /** on scroll to bottom load more books */
    const onMomentumScrollBegin = () => {
      onEndReachedCalledDuringMomentum = false;
    };
  
    /** on scroll to bottom load more books */
    const onEndReachedLoad = () => {

      if (!onEndReachedCalledDuringMomentum) {
        setPage(page+1);
        if (page >5) return;
        console.log('onEndReachedLoad: page: ', page);
        console.log('onEndReachedLoad before: getUserListAction call: ');
        props.getUserActions.getUserListAction(searchValue, page);
  
        onEndReachedCalledDuringMomentum = true;
      }
    };

  return (
    <Fragment>
      <SafeAreaView style={styles.safeAreaView} />
      <SafeAreaView style={styles.safeAreaSubView}>
        <StatusBar
          hidden={false}
          backgroundColor={isSearchClick ? colors.blackShadow : colors.black}
          barStyle="light-content"
        />

        {isSearchClick ? renderSearchBar() : renderTitleBar()}
        <View style={styles.userSearchBarView}>
          <View style={styles.userContainerView}>
            <View style={styles.userListViewParent}>
              {props.getUserListData.length === 0 ? (
                <Text style={styles.userNotAvailableText}>
                  {props.isLoading ? '' : Strings.no_user_to_show}
                </Text>
              ) : (
                <FlatList
                  data={
                    props.getUserListData !== undefined
                      ? props.getUserListData
                      : []
                  }
                  numColumns={2}
                  alwaysBounceHorizontal={false}
                  bounces={false}
                  onEndReachedThreshold={1}
                  onMomentumScrollBegin={onMomentumScrollBegin}
                  onEndReached={onEndReachedLoad}
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
