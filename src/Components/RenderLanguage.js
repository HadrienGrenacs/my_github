import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import getLanguageColor from '../Utils/LanguageColors';

const RenderLanguage = ({language}) => {
  return (
    <View style={styles.rowContainer}>
      <View
        style={{
          height: 16,
          width: 16,
          backgroundColor: getLanguageColor(language),
          borderRadius: 40,
        }}></View>
      <Text style={styles.languageText}>{language}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  languageText: {fontSize: 16, marginLeft: 4},
});
export default RenderLanguage;
