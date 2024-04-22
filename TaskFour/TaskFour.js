import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TaskFour = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];
  const sections = [
    "This is some content for section 1.",
    "This is some content for section 2.",
    "This is some content for section 3.",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabItem,
              index === selectedTab && styles.selectedTabItem,
            ]}
            onPress={() => setSelectedTab(index)}
          >
            <Text>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.scrollViewContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{tabs[selectedTab]}</Text>
          <Text>{sections[selectedTab]}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  section: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabItem: {
    padding: 15,
  },
  selectedTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
});

export default TaskFour;
