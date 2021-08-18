import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';


type props = {
  item: Object;
  itemOnClick?: () => void;
  onFavouriteClick?: () => void;
  favouritesArray?: any
}

const UserView =({
  item,
  itemOnClick,
  onFavouriteClick,
  favouritesArray,
}: props) => {
  const renderImageItemView = item => (
    <TouchableOpacity onPress={itemOnClick}>
      <View style={styles.rowImageViewContainer}>
        <View style={styles.rowImageSubViewContainer}>
          <FastImage
            style={styles.rowImageImage}
            source={{
              uri: item.picture.large,
            }}
          />
          <View style={styles.rowFooterView}>
            <View style={styles.rowImageTitle}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.rowImageTxt}>
                {item.name.title} {item.name.first} {item.name.last}
              </Text>

              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.rowImageSubTxt}>
                {item.location.country}
              </Text>
            </View>

            {favouritesArray === '' ? (
              <View style={styles.rowFavView} />
            ) : (
              <View style={styles.rowFavView}>
                <TouchableOpacity onPress={onFavouriteClick}>
                  <Image
                    style={styles.image}
                    source={
                      favouritesArray.includes(item.email)
                        ? require('../../assets/images/heart_filled.png')
                        : require('../../assets/images/heart.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return <View>{renderImageItemView(item)}</View>;
};

export default UserView;
