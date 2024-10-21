import React, { useContext, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const savePerson = () => {
    addPerson(name, dob);
    navigation.goBack();
  };
  return (
    <View>
      <Text style={styles.mainHeader}>Add A Person</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <View>
        <Text style={styles.selectDate}>Select Date</Text>
        <DatePicker
          options={{
            backgroundColor: "white",
            textHeaderColor: "black",
            textDefaultColor: "#348fab",
            selectedTextColor: "white",
            mainColor: "#99cfe0",
            textSecondaryColor: "#3453ab",
            borderColor: "rgba(122, 146, 165, 0.1)",
          }}
          current="2020-07-13"
          selected={dob}
          mode="calendar"
          minuteInterval={30}
          style={{ borderRadius: 10 }}
          onDateChange={(date) => setDob(date)}
        />
      </View>
      <Button title="Save" onPress={savePerson} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { backgroundColor: "#ffff", height: "100%" },
  selectDate: { fontSize: 20, paddingLeft: 22 },
  inputBlock: {
    paddingLeft: 22,
    marginTop: 15,
    marginBottom: 15,
    paddingRight: 22,
  },
  inputLabel: { fontSize: 20 },
  input: {
    borderBottomWidth: 1,
    paddingTop: 5,
    fontSize: 15,
    marginLeft: 22,
    marginRight: 182,
    marginBottom: 30,
  },
  selectedDate: {
    fontSize: 20,
  },
  mainHeader: { fontSize: 20, paddingLeft: 22, paddingTop: 30 },
  submitButton: {
    marginLeft: 22,
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#99cfe0",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { textAlign: "center", color: "white", fontSize: 17 },
});
