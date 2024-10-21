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

  const DeleteAction = (id) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteIdea(id)}
      >
        <Text style={styles.deleteBtnText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  const ideaBlock = ({ item }) => {
    if (item.id === personId) {
      return (
        <View>
          {item.ideas.map((idea) => (
            <Swipeable
              key={idea.id}
              renderRightActions={() => DeleteAction(idea.id)}
            >
              <TouchableOpacity>
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
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Ideas",
      headerRight: () => (
        <View style={{ paddingRight: 15 }}>
          <Button
            onPress={() =>
              navigation.navigate("AddIdeaScreen", { person: personId })
            }
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
  mainHeader: { fontSize: 20, paddingLeft: 22 },
});
