import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomButtonA from "../components/UI/CustomButtonA";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavParamList } from "../type-utilities/type";
import { Colors } from "../constants/colors";
import { FloatingInput } from "../components/UI/FloatingInput";
import { LockSvg, LogoSvg, MailSvg } from "../components/svgs";

type FormData = {
  email: string;
  password: string;
};

type UsersScreenScreenNavigationProp = NativeStackNavigationProp<
  RootNavParamList,
  "UsersScreen"
>;

type AuthScreenProps = {
  navigation: UsersScreenScreenNavigationProp;
};

const AuthScreen = (props: AuthScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => props.navigation.navigate("UsersScreen");

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.pageTopSectionContainer}>
        <View style={styles.logoImage}>
          <LogoSvg />
        </View>
        <Text style={styles.topText}>Welcome!</Text>
        <Text style={styles.infoText}>
          Sign up or log in to your account to
        </Text>
        <Text style={styles.infoText}>
          manage access to your users smartly.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required.",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address.",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <FloatingInput
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
                autoCapitalize='none'
                keyboardType='email-address'
                leftIcon={<MailSvg />}
                label='Hello'
              />
            );
          }}
          name='email'
        />

        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "This is required.",
            },
            minLength: { value: 4, message: "Password too short." },
            maxLength: { value: 12, message: "Password too long." },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FloatingInput
              containerStyle={{ marginTop: 16 }}
              leftIcon={<LockSvg />}
              label='Password'
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
              secureTextEntry
              rightElement={
                <TouchableOpacity onPress={() => alert("Forgot password?")}>
                  <Text style={styles.forgotText}>Forgot?</Text>
                </TouchableOpacity>
              }
            />
          )}
          name='password'
        />

        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>
      <CustomButtonA onPress={handleSubmit(onSubmit)}>Login</CustomButtonA>
      <View style={styles.authStateContainer}>
        <TouchableOpacity>
          <Text style={styles.authStateButtonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.authStateText}> instead</Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  pageTopSectionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  logoImage: { marginBottom: 42 },
  infoText: {
    color: Colors.greyDark,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Satoshi-400",
    marginBottom: 5,
  },
  topText: {
    color: Colors.appPurple,
    fontFamily: "Satoshi-700",
    fontSize: 32,
    marginBottom: 14,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 15,
  },

  forgotText: {
    color: Colors.appOrange,
    fontFamily: "Satoshi-400",
    fontSize: 14,
  },
  authStateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  authStateText: {
    fontSize: 14,
    color: Colors.greyDark,
    fontFamily: "Satoshi-400",
  },
  authStateButtonText: {
    color: Colors.appOrange,
    fontFamily: "Satoshi-400",
    fontSize: 14,
  },
  errorText: {
    color: "red",
  },
});
