import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated from 'react-native-reanimated';
import PriceDisplay from '../PriceDisplay';

const HEIGHT = 200;

const Product = ({
  image,
  name,
  price,
  short_description,
  avatar,
  onPress,
  discount,
  discount_type,
}) => {
  const [isPressing, setIsPressing] = useState(false);
  const [scale, setScale] = useState(1);
  const [timer, setTimer] = useState(undefined);

  useEffect(() => {
    if (isPressing) {
      let newTimer = setInterval(() => {
        setScale((scale) => scale * 1.02);
      }, 10);

      setTimer(newTimer);
    } else {
      clearInterval(timer);
      setScale(1);
    }
  }, [isPressing]);

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scale }], zIndex: scale },
      ]}>
      <TouchableWithoutFeedback
        onPressIn={() => setIsPressing(true)}
        onPressOut={() => {
          setIsPressing(false);
        }}
        onPress={() => {
          onPress ? onPress() : null;
        }}>
        <ImageBackground
          style={styles.imageBg}
          source={{
            uri: image,
          }}>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <PriceDisplay
              price={price}
              discount={discount}
              discount_type={discount_type}
            />
            <Text style={styles.short_description} numberOfLines={1}>
              {short_description}
            </Text>
            {avatar ? (
              <Image style={styles.avatar} source={{ uri: avatar }} />
            ) : null}
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    aspectRatio: 4 / 3,
    overflow: 'visible',
  },
  imageBg: {
    overflow: 'hidden',
    borderRadius: HEIGHT * 0.04,
    flex: 1,
    margin: 10,
    justifyContent: 'flex-end',
  },
  info: {
    flex: 1 / 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  name: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 5,
  },
  short_description: {
    color: '#fff',
    fontSize: 10,
  },
  avatar: {
    height: HEIGHT / 12,
    aspectRatio: 1,

    position: 'absolute',
    right: 10,
    top: 10,

    borderRadius: HEIGHT / 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
});

export default Product;
