import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";
import { loadUser } from "./actions/authActions";
import Contacts from "./components/contacts/Contacts";
import PrivateRoute from "./components/routing/PrivateRoute";
import ContactDetails from "./components/contacts/contact/contactDetails/ContactDetails";
import CreateContact from "./components/createContact/CreateContact";
import Alert from "./components/alert/Alert";

function App({ store }) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [store]);
  return (
    <div className="App">
      <Navbar />
      <Alert />
      <Switch>
        <Route exact={true} path="/" component={Dashboard} />
        <Route exact={true} path="/register" component={Register} />
        <PrivateRoute exact={true} path="/contacts" component={Contacts} />
        <PrivateRoute exact={true} path="/favourites" component={Contacts} />
        <PrivateRoute
          exact={true}
          path="/create-contact"
          component={CreateContact}
        />
        <PrivateRoute
          exact={true}
          path="/contactDetails/:contact_id"
          component={ContactDetails}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
