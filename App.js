import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import styles from './src/styles'
export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  async function authenticate() {
    const hasPassword = await LocalAuthentication.hasHardwareAsync();

    if (!hasPassword) return;

    const { success, error } = await LocalAuthentication.authenticateAsync();

    if (success) {
      Alert.alert("Autenticação realizada com sucesso");
    } else {
      Alert.alert("A autenticação falhou. Por favor, digite sua senha!");
    }

    setIsModalVisible(false);
  }

  Platform.OS === "ios" && authenticate();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#444"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#444"
      />
      <TouchableOpacity style={styles.button}>
        <Text>Entrar</Text>
      </TouchableOpacity>

      {Platform.OS === "android" && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={authenticate}
        >
          <View style={styles.modal}>
            <Text style={styles.authText}>
              Autentique-se utilizando sua digital
            </Text>
            <TouchableOpacity
              onPress={() => {
                LocalAuthentication.cancelAuthenticate();
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}