import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useContext, useLayoutEffect } from "react";
import PeopleContext from "../PeopleContext";

export default function IdeaScreen({ navigation, route }) {
  const { people, deleteIdea } = useContext(PeopleContext);
  const { personId } = route.params;

  const DeleteAction = (personIdi, ideaId) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteIdea(personIdi, ideaId)}
      >
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const ideaBlock = ({ item }) => {
    if (item.id !== personId) {
      return null;
    }

    if (item.ideas.length == 0) {
      return (
        <View>
          <Text style={styles.noIdeasText}>No Ideas Yet</Text>
        </View>
      );
    }

    return (
      <View>
        {item.ideas.map((idea) => (
          <Swipeable
            key={idea.id}
            renderRightActions={() => DeleteAction(personId, idea.id)}
          >
            <TouchableOpacity style={styles.ideaContainer}>
              <View style={styles.ideaBlock}>
                <Text style={styles.ideaName}>{idea.text}</Text>
                <Image
                  source={{ uri: idea.img }}
                  style={{ width: idea.width, height: idea.height }}
                />
              </View>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ideas",
      headerRight: () => (
        <View style={{ paddingRight: 15 }}>
          <Button
            onPress={() => navigation.navigate("AddIdeaScreen", { personId })}
            title="Add Idea"
            style={styles.addPeopleButton}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <View>
        <Text style={styles.mainHeader}>Idea List</Text>
        <FlatList
          renderItem={ideaBlock}
          data={people}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainHeader: { fontSize: 30, paddingLeft: 22, backgroundColor: "white" },
  noIdeasText: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
    marginVertical: 200,
  },
  ideaBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 22,
    paddingRight: 52,
  },
  ideaName: { fontSize: 20 },
  ideaContainer: { backgroundColor: "white", borderBottomWidth: 2 },
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
});
