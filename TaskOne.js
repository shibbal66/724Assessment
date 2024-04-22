import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";

const TaskOne = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}`
      );
      setData([...data, ...response.data]);
      setPage(page + 1);
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const stickyHeaderData = [{ id: "stickyHeader" }, ...data];

  return (
    <FlatList
      data={stickyHeaderData}
      renderItem={({ item }) =>
        item.id === "stickyHeader" ? (
          <View style={styles.header}>
            <Text>Sticky Header</Text>
          </View>
        ) : (
          renderItem({ item })
        )
      }
      keyExtractor={(item) => item.id.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={fetchData}
      onEndReachedThreshold={0.5}
      stickyHeaderIndices={[0]}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 20,
    width: "100%",
    height: 50,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "grey",
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
});

export default TaskOne;
