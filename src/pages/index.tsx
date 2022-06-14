import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "../contexts/AuthContext";
import { SSRGuest } from "../utils/SSRGuest";

type SingInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório.").email("E-mail inválido."),
  password: yup.string().required("Senha obrigatória."),
});

const SignIn = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;
  const { signIn } = useAuthContext();

  const handleSignIn: SubmitHandler<SingInFormData> = async (data) => {
    await signIn(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            label="E-mail"
            name="email"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <Input
            label="Senha"
            name="password"
            type="password"
            error={errors.password}
            {...register("password")}
            autoComplete="on"
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignIn;

export const getServerSideProps = SSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
