import { View, Text, Image, ScrollView } from 'react-native';
import { icons, images } from '../../constants';
import InputField from '../../components/inputField';
import { useState } from 'react';
import CustomButton from '../../components/customButton';
import { Link, router } from 'expo-router';
import OAuth from '../../components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
  });
  const [code, setCode] = useState('');

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'verification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        setVerification({
          ...verification,
          state: 'success',
        });
        await setActive({ session: signUpAttempt.createdSessionId });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: 'Verification failed. Please try again.',
          state: 'failed',
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: 'Verification failed. Please try again.',
        state: 'failed',
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // if (pendingVerification) {
  //   return (
  //     <>
  //       <Text>Verify your email</Text>
  //       <TextInput
  //         value={code}
  //         placeholder="Enter your verification code"
  //         onChangeText={(code)=> setCode(code)}
  //       />
  //       <Button title="Verify" onPress={onVerifyPress} />
  //     </>
  //   )
  // }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[180px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[180px]" />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-3 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          {/* oAuth */}
          <OAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an Account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          // onBackdropPress={() =>
          //   setVerification({ ...verification, state: "default" })
          // }
          onModalHide={() => {
            if (verification.state === 'success') {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </Text>
            <InputField
              label={'Code'}
              icon={icons.lock}
              placeholder={'12345'}
              value={code}
              keyboardType="numeric"
              onChangeText={(code) => setCode(code)}
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onVerifyPress}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push(`/(root)/(tabs)/home`);
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
