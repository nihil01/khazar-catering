import { Route, Switch, useLocation } from "wouter";
import Root from "./components/user/root.tsx";
import { Contact } from "./components/user/contacts.tsx";
import Header from "./components/user/header.tsx";
import { Footer } from "./components/user/footer.tsx";
import { About } from "./components/user/about.tsx";
import notFound from "./components/user/notFound.tsx";
import { Gallery } from "./components/user/gallery.tsx";
import { Admin } from "./components/admin/Auth.tsx";
import { useLang } from "./utils/LangContext.tsx";
// import { News } from "./components/user/news.tsx";
import { OrderPage } from "./components/user/orderpage.tsx";

function App() {
  const { lang, data, loading } = useLang();
  const [location] = useLocation();
  console.log(loading)
  console.log(data)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-neutral-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-x-yellow-100 border-b-yellow-500 border-y-black border-dashed rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {location !== "/admin" && <Header lang={lang} />}

      <Switch>

        <Route path="/">
          {() => <Root res={data} />}
        </Route>

        <Route path="/contact" component={Contact} />

        <Route path="/about">
          {() => <About res={data} />}
        </Route>

        <Route path="/gallery">
          {() => <Gallery res={data} />}
        </Route>

        {/*<Route path="/news" component={News} />*/}
        <Route path="/orderpage" component={OrderPage} />
        <Route path="/admin" component={Admin} />
        <Route component={notFound} />
      </Switch>

      {location !== "/admin" && <Footer />}
    </>
  );
}

export default App;
