import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import {
  Button,
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people, deletePerson } = useContext(PeopleContext);

  const DeleteAction = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deletePerson(id)}
      >
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    );
  };
  const peopleCard = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => DeleteAction(item.id)}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("IdeaScreen", { personId: item.id })
          }
        >
          <View style={styles.personBlock}>
            <View>
              <Text style={styles.personName}>{item.name}</Text>
              <Text style={styles.date}>{item.dob}</Text>
            </View>
            <MaterialIcons
              name="lightbulb"
              size={45}
              style={{ paddingRight: 10 }}
            />
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "People",
      headerRight: () => (
        <View style={{ paddingRight: 15 }}>
          <Button
            onPress={() => navigation.navigate("AddPeopleScreen")}
            title="Add People"
            style={styles.addPeopleButton}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={styles.mainContainer}>
          <Text style={styles.mainHeader}>People List</Text>
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={peopleCard}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  personName: {
    fontSize: 20,
    color: "black",
    marginTop: 15,
    marginLeft: 22,
  },
  personBlock: {
    backgroundColor: "white",
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
  },
  date: { color: "black", fontSize: 20, marginLeft: 22 },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
  },
  deleteBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  mainHeader: {
    fontSize: 30,
    marginBottom: 5,
    marginLeft: 20,
  },
  mainContainer: { backgroundColor: "white" },
});
