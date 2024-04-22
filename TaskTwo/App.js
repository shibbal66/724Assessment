import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "./store/userSlice"; // Import user actions
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  const [input, setInput] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addUser({ name: input.trim() }));
      setInput("");
    }
  };

  const handleEdit = (id, text) => {
    setEditText(text);
    setEditId(id);
  };

  const handleUpdate = () => {
    if (editText.trim() && editId !== null) {
      dispatch(updateUser({ id: editId, name: editText.trim() }));
      setEditText("");
      setEditId(null);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {editId === item.id ? (
        <TextInput
          style={styles.input}
          onChangeText={setEditText}
          value={editText}
        />
      ) : (
        <Text
          style={styles.text}
          onPress={() => handleEdit(item.id, item.name)}
        >
          {item.name}
        </Text>
      )}
      <View style={styles.buttons}>
        {editId === item.id ? (
          <Button title="Save" onPress={handleUpdate} />
        ) : (
          <Button title="Edit" onPress={() => handleEdit(item.id, item.name)} />
        )}
        <Button
          title="Delete"
          onPress={() => dispatch(deleteUser(item.id))}
          color="red"
        />
      </View>
    </View>
  );

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={input}
          placeholder="Add a new user"
        />
        <Button title="Add" onPress={handleAdd} />
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: "80%",
  },
  item: {
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
  },
});
