import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useContext } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PeopleContext from "../PeopleContext";

export default function AddIdeaScreen({ navigation, route }) {
  const [facing, setFacing] = useState();
  const [text, setText] = useState();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState();
  const [photo, setPhoto] = useState();
  const { addIdea } = useContext(PeopleContext);
  const { person } = route.params;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setPhoto(data.uri);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const saveIdea = () => {
    const img = { uri: photo, width: 200, height: 300 };
    addIdea(person.id, text, img.uri, img.width, img.height);
    navigation.navigate("IdeaScreen", { personId: person.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Add an Idea for{person.name} </Text>
      <View>
        <Text style={styles.ideaNameLabel}>Gift Idea</Text>
        <TextInput
          style={styles.ideaNameInput}
          placeholder="Ex: Gaming Monitor"
          onChangeText={setText}
        />
      </View>
      {!photo ? (
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={(ref) => setCameraRef(ref)}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <MaterialIcons
                name="cameraswitch"
                size={50}
                style={{ padding: 10, color: "white" }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialIcons
              name="camera-alt"
              size={50}
              style={{ padding: 10, color: "white" }}
            />
          </TouchableOpacity>
        </CameraView>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.imagePreview} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.retakeButtons}
              onPress={retakePhoto}
            >
              <Text style={styles.captureText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.retakeButtons} onPress={saveIdea}>
              <Text style={styles.captureText}>Add Gift</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainHeader: { fontSize: 22, paddingLeft: 22, marginTop: 10 },
  ideaNameLabel: { fontSize: 18, paddingLeft: 22, marginTop: 15 },
  ideaNameInput: { fontSize: 15, paddingLeft: 22, marginBottom: 30 },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 100,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginLeft: 22,
  },
  flipButton: {
    position: "absolute",
    top: 30,
    backgroundColor: "rgba(50, 50, 50, .15)",
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  captureButton: {
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "rgba(50, 50, 50, .15)",
    borderRadius: 50,
  },
  captureText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  retakeButtons: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 5,
    marginTop: 5,
  },
});
