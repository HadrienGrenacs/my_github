import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {getRepoByName} from '../../Api/GithubApi';
import RenderFavorite from '../../Components/renderFavorite';
import RenderLanguage from '../../Components/RenderLanguage';

const Informations = ({route}) => {
  const [infos, setInfos] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRepoByName(route.params.login, route.params.name).then(data => {
      setInfos(data);
    });

    setLoading(false);
  }, [route.params.login, route.params.name]);

  const renderLoading = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
  };

  const renderInfos = () => {
    if (infos !== undefined) {
      return (
        <ScrollView>
          <View style={styles.userContainer}>
            <View>
              <Image
                style={styles.image}
                source={{uri: infos.owner.avatar_url}}
              />
              <Image
                style={styles.imageLogo}
                source={require('../../Assets/repos_logo.png')}
              />
            </View>
            <View style={styles.infosContainer}>
              <Text style={styles.repoTitle}>{infos.name}</Text>
              <View style={styles.infoDetail}>
                <Text style={styles.info}>Private</Text>
                <Text>{infos.private ? '✅' : '❌'}</Text>
              </View>
              <View style={styles.infoDetail}>
                <Text style={styles.info}>Fork</Text>
                <Text>{infos.fork ? '✅' : '❌'}</Text>
              </View>
              <View style={styles.infoDetail}>
                <Text style={styles.info}>Size</Text>
                <Text style={styles.size}>{infos.size} KB</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.info}>Default branch name</Text>
            <Text style={styles.data}>{infos.default_branch}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.info}>Main language</Text>
            <RenderLanguage
              language={infos.language ? infos.language : 'unknown'}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.info}>Description</Text>
            <Text style={styles.lightText}>{infos.description}</Text>
          </View>
          <View style={styles.favoriteContainer}>
            <RenderFavorite item={infos} size={50} />
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.main_container}>
      {renderInfos()}
      {renderLoading()}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  userContainer: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  favoriteContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  imageLogo: {height: 38, width: 38, position: 'absolute', left: 65, top: 65},
  dataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repoTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 8,
  },
  data: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  infosContainer: {
    paddingLeft: 24,
  },
  info: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: '500',
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 250, 250, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoDetail: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightText: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '400',
    color: '#6a6a6a',
  },

  detailsContainer: {
    marginTop: 8,
  },
});

export default Informations;
