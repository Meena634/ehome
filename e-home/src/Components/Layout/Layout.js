import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <header id="header">
      <Header />
      </header>
      <main style={{ minHeight: "70vh" }}>
        <Toaster />

        {children}
      </main>
      <footer id="footer">
      <Footer />
      </footer>
    </div>
  );
};

Layout.defaultProps = {
  title: "B.tech wala organic food court - order now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Henotic",
};

export default Layout;
