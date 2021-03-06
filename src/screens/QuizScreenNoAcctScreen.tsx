import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import CircularTimer from 'react-native-circular-timer';
import { QuestionResult } from './QuizResultsScreenNoAcctScreen';
import { OfflineContact } from './noAcctHelperFunctions';

interface QuestionOption {
  contact: OfflineContact;
  isCorrect: boolean;
}

interface Props {
  navigation: any;
  route: {
    params: {
      contacts: OfflineContact[];
      questionResults: QuestionResult[];
      QuizTitleListName: string;
      CurrentQuizQuestionNumber: number;
    };
  };
}

class QuizScreenNoAcctScreen extends React.Component<Props> {
  private timer: CircularTimer | null;

  constructor(props: Props) {
    super(props);
    this.timer = null;
  }

  restartTimer() {
    if (this.timer) {
      this.timer.restart();
    }
  }

  componentDidUpdate() {
    this.restartTimer();
  }

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const { QuizTitleListName, contacts } = this.props.route.params;
    var { CurrentQuizQuestionNumber } = this.props.route.params;
    var questionResults = this.props.route.params.questionResults ?? [];
    var QuizTotalNumberOfQuestions = contacts.length;
    CurrentQuizQuestionNumber = CurrentQuizQuestionNumber + 1;
    var ProgressBarWidth =
      (CurrentQuizQuestionNumber / QuizTotalNumberOfQuestions) * screenWidth;

    const correctContactIndex = CurrentQuizQuestionNumber - 1;
    const correctContact = contacts[correctContactIndex];

    const getUniqueRandomOptions = (): QuestionOption[] => {
      let options: QuestionOption[] = [];
      let indeces: number[] = [];
      for (let i = 0; i < contacts.length; i++) {
        if (!(i === correctContactIndex)) {
          indeces.push(i);
        }
      }
      const randomIndeces = indeces.sort(() => 0.5 - Math.random());
      for (let i = 0; i < 4; i++) {
        options[i] = {
          contact: contacts[randomIndeces[i]],
          isCorrect: false,
        };
      }

      return options;
    };

    // Initialize options with random contacts
    const questionOptions = getUniqueRandomOptions();

    // Insert correct option at random position
    const correctIndex = Math.floor(Math.random() * 4);
    questionOptions[correctIndex] = {
      contact: correctContact,
      isCorrect: true,
    };

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            marginTop: RFValue(70),
            width: '80%',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.QuizTitleListNameStyling}>
            {QuizTitleListName}
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('List Details No Account')
            }
          >
            <Icon name="cross" size={25} color="#636363" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: RFValue(50),
            width: '80%',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 3.5,
              marginTop: RFValue(0),
              width: '125%',
              alignItems: 'center',
            }}
          >
            <CircularTimer
              ref={(timer) => (this.timer = timer)}
              seconds={10}
              radius={RFValue(37)}
              borderWidth={RFValue(6)}
              borderBackgroundColor={'#FFB906'}
              borderColor={'#DDDDDD'}
              onTimeElapsed={() => {
                if (CurrentQuizQuestionNumber != QuizTotalNumberOfQuestions) {
                  questionResults.push({
                    contact: correctContact,
                    correct: false,
                  });
                  this.props.navigation.navigate('Quiz No Account', {
                    questionResults,
                    CurrentQuizQuestionNumber: CurrentQuizQuestionNumber,
                  });
                }
              }}
            />
            <Text style={styles.HooIsText}>Hoo is...</Text>
            <Text style={styles.QuizPersonName}>{correctContact.name}</Text>
          </View>

          <View style={{ flex: 5.5, width: '87%' }}>
            {(() => {
              const wrapper = (children: any, key: number) => (
                <View
                  key={key}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: RFValue(5),
                  }}
                >
                  {children}
                </View>
              );

              const option = (index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    questionResults.push({
                      contact: correctContact,
                      correct: questionOptions[index].isCorrect,
                    });
                    if (
                      CurrentQuizQuestionNumber < QuizTotalNumberOfQuestions
                    ) {
                      this.props.navigation.navigate('Quiz No Account', {
                        questionResults,
                        CurrentQuizQuestionNumber: CurrentQuizQuestionNumber,
                      });
                    } else {
                      this.props.navigation.navigate(
                        'Quiz Results No Account',
                        {
                          questionResults,
                          CurrentQuizQuestionNumber: CurrentQuizQuestionNumber,
                        }
                      );
                    }
                  }}
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    borderWidth: 2,
                    marginRight: RFValue(5),
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    style={styles.QuizQuestionImage}
                    source={{
                      uri: questionOptions[index].contact.uri,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );

              return (
                <View>
                  {[
                    wrapper([option(0), option(1)], 0),
                    wrapper([option(2), option(3)], 1),
                  ]}
                </View>
              );
            })()}
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 0,
              width: '125%',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 0,
                width: '80%',
                alignItems: 'baseline',
                borderWidth: 0,
              }}
            >
              <Text style={styles.QuestionCounter}>
                Question {CurrentQuizQuestionNumber} of{' '}
                {QuizTotalNumberOfQuestions}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 0,
                width: '100%',
                borderWidth: 0,
                backgroundColor: 'lightgrey',
              }}
            >
              <View
                style={{
                  width: ProgressBarWidth,
                  flex: 1,
                  backgroundColor: '#6EA8FF',
                  borderBottomRightRadius: 50,
                  borderTopRightRadius: 50,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  QuizTitleListNameStyling: {
    fontWeight: 'bold',
    fontSize: RFValue(18),
    width: '85%',
    color: '#494949',
  },
  HooIsText: {
    marginTop: '8%',
    fontWeight: '700',
    fontSize: RFValue(20),
    color: '#000000',
  },

  QuizPersonName: {
    marginTop: 3,
    fontWeight: 'bold',
    fontSize: RFValue(37),
    color: '#000000',
  },

  QuizQuestionImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },

  QuestionCounter: {
    fontSize: RFValue(14),
    fontWeight: '600',
  },

  QuizQuestionProgressBar: {
    width: 10,
    height: 100,
    backgroundColor: '#6EA8FF',
  },
});

export default QuizScreenNoAcctScreen;
