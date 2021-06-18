import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getIssues} from '../../Api/GithubApi';

const Issues = ({route}) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIssues(route.params.login, route.params.name).then(data => {
      setIssues(data);
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

  const FlatListItemSeparator = () => <View style={styles.separator} />;

  const renderIssue = ({item}) => (
    <View style={styles.elementContainer}>
      <Text>title : {item.title}</Text>
      <Text>state : {item.state}</Text>
      <Text>user : {item.user.login}</Text>
      <Text>body : {item.body}</Text>
    </View>
  );

  const renderIssues = () => (
    <View style={styles.totalContainer}>
      <Text style={styles.total}>{issues.length} issues(s) found</Text>
      <FlatList
        data={issues}
        renderItem={renderIssue}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.noResults}>
      <Text>No issues found</Text>
    </View>
  );

  return (
    <View style={styles.main_container}>
      {issues.length > 0 ? renderIssues() : renderNoResults()}
      {renderLoading()}
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
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
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  totalContainer: {
    marginVertical: 8,
    marginLeft: 8,
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

export default Issues;
