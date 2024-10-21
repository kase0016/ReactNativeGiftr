import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const STORAGE_KEY = "people";

  useEffect(() => {
    const loadPeople = async () => {
      const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPeople) setPeople(JSON.parse(savedPeople));
    };
    loadPeople();
  }, []);

  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
      ideas: [],
    };
    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const addIdea = async (personId, text, img, width, height) => {
    const newIdea = {
      id: randomUUID(),
      text,
      img,
      width,
      height,
    };
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        return {
          ...person,
          ideas: [...person.ideas, newIdea],
        };
      }
      return person;
    });

    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const deleteIdea = async (personId, ideaId) => {
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        return {
          ...person,
          idea: person.idea.filter((idea) => idea.id !== ideaId),
        };
      }
      return person;
    });

    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const deletePerson = async (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  return (
    <PeopleContext.Provider
      value={{ people, addPerson, deletePerson, addIdea, deleteIdea }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;
