import LoginRegisterWrapper from "@/components/login/loginRegisterWrapper";

function Login({ test }) {
  return (
    <>
      <LoginRegisterWrapper test={test} />
    </>
  );
}

export default Login;

export async function getServerSideProps({ req, res, resolvedUrl }) {
  //   const storeID = await getCurrentStoreID(req, res);
  const test = "cdbcvhdvcmdzckzdk";

  //   if (storeID > 0) {
  //     return {
  //       redirect: {
  //         destination: "/",
  //         permanent: false,
  //       },
  //     };
  //   }

  return {
    props: { test },
  };
}
