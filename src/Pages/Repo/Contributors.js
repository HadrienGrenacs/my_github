import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {getContributors} from '../../Api/GithubApi';
import RenderUser from '../../Components/renderUser';

const Contributors = ({route}) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContributors(route.params.login, route.params.name).then(data => {
      setContributors(data);
      setLoading(false);
    });
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

  const renderContributors = () => (
    <View style={styles.totalContainer}>
      <Text style={styles.total}>
        {contributors.length} contributor(s) found
      </Text>
      <FlatList
        data={contributors}
        renderItem={({item}) => <RenderUser item={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.noResults}>
      <Text>No contributors found</Text>
    </View>
  );

  return (
    <View style={styles.main_container}>
      {contributors.length > 0 ? renderContributors() : renderNoResults()}
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
    marginTop: 12,
  },

  totalContainer: {
    marginVertical: 8,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
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

export default Contributors;
