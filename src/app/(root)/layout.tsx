import Footer from "@/components/shared-components/footer";
import Navbar from "@/components/shared-components/navbar";


const RootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;