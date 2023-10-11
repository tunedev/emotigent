import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <SignUp redirectUrl="/new-user" />;
};

export default SignUpPage;
