import {StyleSheet, Dimensions} from 'react-native';

import colors from '../../resource/colors';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  mainContainer: {flex: 1, backgroundColor: colors.black},
  safeAreaView: {flex: 0, backgroundColor: colors.white},
  safeAreaSubView: {flex: 1, backgroundColor: colors.white},
  bgPhotoStyle: {
    width: width,
    height: height - height / 3,
    resizeMode: 'stretch',
  },
  viewContent: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
  },
  linearGradient: {
    width: width,
    height: height - height / 3,
    position: 'absolute',
  },
  headerContainer: {
    backgroundColor: 'transparent',
    width,
    height: 65,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackTitleText: {
    fontSize: 22,
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  scrollSubView: {flexGrow: 1, height: 1.4 * height},
  trackDetails: {fontSize: 16, color: 'black', padding: 20, paddingTop: 1},
  imageTrackPicture: {
    height: 200,
    width: 100,
    borderColor: 'blue',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
  },
  titleBarView: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  titleBarViewMiddle: {flex: 0.6},
  headerTextStyle: {
    alignSelf: 'center',
    color: colors.lightpink,
    fontSize: 19,
    textAlign: 'center',
  },
  searchIcon: {
    color: colors.white,
    justifyContent: 'center',
    marginRight: 10,
  },
  imageTitle: {
    width: 27,
    height: 27,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  userImage: {
    width: 200,
    height: 280,
    resizeMode: 'contain',
    borderRadius: 15,
    marginTop: height / 9,
  },
  userNameText: {
    fontSize: 33,
    fontFamily: 'Roboto-Bold',
    marginTop: 15,
    color: colors.white,
  },

  userNicknameText: {
    fontSize: 23,
    fontFamily: 'Roboto-Thin',
    color: colors.white,
  },
  userStatusText: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: colors.lightRed,
  },
  userLabelText: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: colors.green,
    marginBottom: 5,
  },
  userValueText: {
    fontSize: 20,
    fontFamily: 'Roboto-Thin',
    color: colors.white,
  },

  subSectionView: {
    flex: 0.6,
    flexDirection: 'column',
  },
  textContentView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
  },
  birthDayContentView: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  viewBirthDate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthIcon: {
    color: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  countryView: {
    flex: 1,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default styles;
