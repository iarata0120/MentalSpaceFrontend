import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Center,
  Heading,
  VStack,
  Button,
  FormControl,
  Input,
  Link,
  WarningOutlineIcon,
} from 'native-base';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import React from 'react';
import { LoginStackList } from '../components/login_stack';
import TextDivider from '../components/text_divider';
import { AccessTokenResponse } from '../hooks/useAccessToken';
import { useLogin } from '../hooks/useLogin';
import { NavigationHelpersContext } from '@react-navigation/native';

type LoginScreenProps = NativeStackScreenProps<LoginStackList, 'Login'>;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const login = useLogin();
  useEffect(() => {
    if (login.isSuccess) {
      console.log(login.data.status);
      if (login.data.status === 'success') {
        queryClient.setQueryData(
          'accessTokenResponse',
          login.data as AccessTokenResponse
        );
        console.log(login.data);
        navigation.navigate('Home');
      } else if (login.data.status === 'error') {
        console.log(login.data);
      }
    }
  }, [login.isSuccess]);

  return (
    <Center w="100%">
      <Box
        style={{
          shadowOffset: { width: 0, height: 0 },
          shadowColor: '#154c79',
          shadowOpacity: 0.7,
          shadowRadius: 4,
          elevation: 7,
          marginTop: 40,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 30,
          backgroundColor: 'white',
          borderRadius: 30,
        }}
        safeArea
        p="2"
        py="8"
        w="90%"
        maxW="290"
      >
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl
            isInvalid={
              login.isSuccess ? login.data.errors?.email !== undefined : false
            }
          >
            <FormControl.Label>Email ID</FormControl.Label>
            <Input onChangeText={setEmail} />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {login.data?.errors?.email}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              login.isSuccess
                ? login.data.errors?.password !== undefined
                : false
            }
          >
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={setPassword} />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {login.data?.errors?.password}
            </FormControl.ErrorMessage>
            <Link
              _text={{
                fontSize: 'xs',
                fontWeight: '500',
                color: 'indigo.500',
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={() => navigation.navigate('Reset')}
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" onPress={() => login.mutate({ email, password })}>
          {/* <Button mt="2" onPress={() => navigation.navigate('Home')}> */}
            Sign in
          </Button>
          <TextDivider msg="or" />
          <Button
            variant="outline"
            onPress={() => navigation.navigate('UserRegistration')}
          >
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginScreen;
