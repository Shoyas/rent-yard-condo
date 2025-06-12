

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default RootLayout;