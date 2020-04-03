import React from 'react';
import { View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';

import Product from '../../components/Product';

const products = require('../../../assets/products.json');

const filterByCategory = (data) => {
  let sortedData = {};

  data.forEach((item) => {
    let cat = item.category;

    if (!sortedData[cat]) {
      sortedData[cat] = [];
    }
    sortedData[cat][item.order] = item; //use the order value on the item as the key in the array to avoid having to sort this afterwards
  });

  return sortedData;
};

const ProductList = (props) => {
  let { data, title, navigation } = props;
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Product
            {...item}
            onPress={() =>
              navigation.navigate('ProductDetails', { product: item })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </>
  );
};

const Market = (props) => {
  let sortedProducts = filterByCategory(products);
  return (
    <View style={styles.container}>
      {Object.keys(sortedProducts).map((catName, i) => {
        return (
          <ProductList
            key={`ProductList_${catName}_${i}`}
            title={catName}
            data={sortedProducts[catName]}
            navigation={props.navigation}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 10,
  },
});

export default Market;
