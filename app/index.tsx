import {
  Text,
  View,
  Platform,
  NativeModules,
  useColorScheme,
  NativeEventEmitter,
  PermissionsAndroid,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import BleManager from "react-native-ble-manager";
import { Colors } from "react-native/Libraries/NewAppScreen";

// const BleManagerModule = NativeModules.BleManager;
// const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function generateUniqueID() {
  let id = "";
  const characters = "0123456789";
  const idLength = 4;

  for (let i = 0; i < idLength; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
}

export default function Index() {
  const isDarkMode = useColorScheme() === "dark";
  const [counter, setCounter] = useState(0);
  const [id, setId] = useState("");
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setId(generateUniqueID());
  }, []);

  const handleIncrementCounter = () => {
    const uniqueID = "Bopanna";
    const timestamp = new Date().toISOString();
    setCounter((prevCounter) => prevCounter + 1);

    // Make API call
    fetch("http://192.168.1.3:3000/heartRate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        participantId: id,
        heartRate: counter + 1,
        timestamp: timestamp,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Heart rate data saved successfully");
        } else {
          console.error("Failed to save heart rate data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.mainBody}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View>
          <Text style={styles.buttonTextStyle}>{counter}</Text>
          <Text style={styles.buttonTextStyle}>{id}</Text>
        </View>
        <TouchableOpacity
          onPress={handleIncrementCounter}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Increment Counter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});
