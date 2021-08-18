import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../resource/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeAreaView: {flex: 0, backgroundColor: colors.black},
  safeAreaSubView: {flex: 1, backgroundColor: colors.black},
  headerContainer: {
    backgroundColor: colors.black,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  titleBarView: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  titleBarViewTitle: {flex: 0.6},
  headerTextStyle: {
    fontSize: 20,
    color: colors.white,
    marginLeft: 20,
    fontFamily: 'Roboto-Bold',
  },

  searchMain: {
    flexDirection: 'row',
    height: 37,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 80 / 2,
    backgroundColor: colors.blackShadow,
    alignItems: 'center',

    width: '93%',
  },
  searchIcon: {
    color: colors.white,
    justifyContent: 'center',
    marginRight: 10,
  },
  searchIconExtra: {marginLeft: 5},
  searchTextInput: {
    flex: 1,
    fontSize: 25,
    marginLeft: 15,
    justifyContent: 'center',
    color: colors.white,
    fontFamily: 'Roboto-Thin',
  },

  userSearchBarView: {flex: 1, flexDirection: 'column'},
  userContainerView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.black,
    alignContent: 'center',
    alignItems: 'center',
  },
  userListViewParent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userViewSearchBarContainer: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
    backgroundColor: colors.blackShadow,
  },

  userNotAvailableText: {
    fontFamily: 'Roboto-Bold',
    marginTop: 50,
    fontSize: 18,
  },
  imageTitle: {
    width: 27,
    height: 27,
    marginLeft: 10,
    resizeMode: 'contain',
  },
});

export default styles;
