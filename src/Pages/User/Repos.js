import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {getRepos} from '../../Api/GithubApi';
import RenderRepoDetails from '../../Components/RenderRepoDetails';

const Repos = ({route}) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRepos(route.params.login).then(data => {
      setRepos(data);
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

  const renderRepos = () => (
    <View style={styles.totalContainer}>
      <Text style={styles.total}>{repos.length} repo(s) found</Text>
      <FlatList
        data={repos}
        renderItem={({item}) => <RenderRepoDetails item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.noResults}>
      <Text>No repos found</Text>
    </View>
  );

  return (
    <View style={styles.main_container}>
      {repos.length > 0 ? renderRepos() : renderNoResults()}
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

  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  totalContainer: {
    marginTop: 12,
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

export default Repos;
