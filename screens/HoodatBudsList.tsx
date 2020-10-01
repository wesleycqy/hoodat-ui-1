import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { RFValue } from "react-native-responsive-fontsize";
import { Contact } from "./myListsScreen";


interface Props {
  navigation: any;
  route: any;
}

interface State {
  contacts: Contact[];
}

class HoodatBudsList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { contacts } = this.props.route.params;

    this.state = { contacts };
  }

  render() {
    var ListTitleName = "Hoodat Buds"
    var CurrentQuestionNumber = 0 //Used for keeping track of quiz later on
    var ListNames = this.state.contacts.map((contact: Contact) => contact.name);
    
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            marginTop: RFValue(70),
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("My Lists")}
            style={styles.backButton}
          >
            <Icon name="chevron-thin-left" size={25} color="#828282" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionsButton}>
            <Icon name="dots-three-vertical" size={25} color="#636363" />
          </TouchableOpacity>
        </View>

        <Text style={styles.ListTitle}>ListTitleName</Text>


        <View style={[styles.searchBar, { flex: 0, flexDirection: "row" }]}>
          <TextInput style={styles.searchTextInput} placeholder="Search..." />
          <Icon name="magnifying-glass" size={18} color="#828282" />
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Add Form")}
        >
          <Text style={styles.addMorePeopleButton}>+ Add More People</Text>
        </TouchableOpacity>

        <View style={styles.PeopleListScrollView}>
          <ScrollView>
            {this.state.contacts.map((contact: Contact) => (
              <View
                style={[styles.PeopleInList, { flex: 0, flexDirection: "row" }]}
              >
                <Image
                  style={styles.PeopleInListPicture}
                  source={{
                    uri: `data:${contact.image.fileType};base64,${contact.image.data}`,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.PeopleInListName}>{contact.name}</Text>
                <TouchableOpacity style={styles.PeopleInListOptions}>
                  <Icon name="dots-three-vertical" size={20} color="#636363" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.QuizMeButton, { flex: 0, flexDirection: "row" }]}
              onPress={() => this.props.navigation.navigate("Quiz Screen", { QuizTitleListName:ListTitleName, QuizListNames:ListNames, CurrentQuizQuestionNumber:CurrentQuestionNumber })}
            >
              <Icon
                marginTop="20"
                name="flash"
                size={30}
                color="#FFFFFF"
                style={styles.QuizMeFlashIcon}
              />
              <Text style={styles.QuizMeText}>Quiz Me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

{/* <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity style={[styles.QuizMeButton, {flex:0, flexDirection:'row'}]} )}>
                  <Icon marginTop="20" name="flash" size={30} color="#FFFFFF" style={styles.QuizMeFlashIcon}/>
                  <Text style={styles.QuizMeText}>Quiz Me</Text>
              </TouchableOpacity>
            </View> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  ListTitle: {
    marginTop: RFValue(30),
    fontSize: RFValue(30),
    fontWeight: "800",
    width: "80%",
  },

  searchBar: {
    marginTop: 30,
    paddingVertical: 15,
    paddingLeft: 22,
    width: "80%",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    marginBottom: RFValue(25),
  },

  searchTextInput: {
    fontWeight: "500",
    fontSize: 20,
    width: "85%",
    color: "#828282",
  },

  addMorePeopleButton: {
    color: "#6EA8FF",
    fontWeight: "800",
    fontSize: RFValue(14),
    marginBottom: RFValue(18),
  },

  PeopleListScrollView: {
    marginBottom: 80,
    width: "80%",
    height: "40%",
  },

  PeopleInList: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#F0EDED",
    marginBottom: RFValue(14),
  },

  PeopleInListPicture: {
    marginVertical: 9,
    marginLeft: "10%",
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },

  PeopleInListName: {
    marginVertical: 16,
    marginLeft: RFValue(17),
    fontWeight: "800",
    textAlignVertical: "center",
    fontSize: 20,
    width: "60%",
    color: "#494949",
  },

  PeopleInListOptions: {
    marginVertical: 17,
    marginRight: 20,
    textAlignVertical: "center",
  },

  QuizMeButton: {
    marginTop: RFValue(20),
    marginLeft: 180,
    backgroundColor: "#6EA8FF",
    width: 140,
    height: 60,
    borderRadius: 43,
  },

  QuizMeFlashIcon: {
    marginLeft: 12,
    marginTop: 14,
  },

  QuizMeText: {
    marginTop: 18,
    marginLeft: 3,
    fontWeight: "800",
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default HoodatBudsList;
