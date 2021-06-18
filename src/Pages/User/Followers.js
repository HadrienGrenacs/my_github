import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {getFollowers} from '../../Api/GithubApi';
import RenderUser from '../../Components/renderUser';

const Followers = ({route}) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFollowers(route.params.login).then(data => {
      setFollowers(data);
      setLoading(false);
    });
  }, [route.params.login]);

  const renderLoading = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
  };

  const renderFollowers = () => (
    <View style={styles.totalContainer}>
      <Text style={styles.total}>{followers.length} followers(s) found</Text>
      <FlatList
        data={followers}
        renderItem={({item}) => <RenderUser item={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.noResults}>
      <Text>No followers found</Text>
    </View>
  );

  return (
    <View style={styles.main_container}>
      {followers.length > 0 ? renderFollowers() : renderNoResults()}
      {renderLoading()}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 8,
  },
  elementContainer: {
    marginVertical: 8,
  },

  totalContainer: {
    marginVertical: 8,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default Followers;
