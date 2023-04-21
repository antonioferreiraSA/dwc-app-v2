import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ScreenTemplate from '../../components/ScreenTemplate';
import Button from '../../components/Button';
import TextInputBox from '../../components/TextInputBox';
import Logo from '../../components/Logo';
import { auth } from '../../firebase/config';
import { colors, fontSize } from '../../theme';
import { ColorSchemeContext } from '../../context/ColorSchemeContext';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { scheme } = useContext(ColorSchemeContext);
  const isDark = scheme === 'dark';
  const colorScheme = {
    text: isDark ? colors.white : colors.primaryText,
  };

  const handleResetPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.log('Error occurred while resetting password.', error);
    }
  }


  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../../assets/images/images/adaptive-icon.png')}
        />
        <TextInputBox
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType={'email-address'}
        />

        <Button
          label="Reset Password"
          color={colors.primary}
          onPress={() => handleResetPassword(email)}
          isLoading={isLoading}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>
            Go Back To :{' '}
            <Text onPress={() => navigation.navigate('Login')} style={styles.footerLink}>
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ScreenTemplate>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: fontSize.large,
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
});
