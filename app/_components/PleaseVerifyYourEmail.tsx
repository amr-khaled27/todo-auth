const PleaseVerifyYourEmail = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-10"></div>

      <div className="bg-yellow-400 z-30 fixed bottom-0 left-0 w-full text-black *:text-center py-2">
        <p>please verify your email</p>
        <p>we have sent you an email, check your inbox!</p>
      </div>
    </>
  );
};

export default PleaseVerifyYourEmail;
