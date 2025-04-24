import { Header } from "../components/Header";
import { About } from "../components/About";
import { Teaching } from "../components/Teaching";

export const Home = () => {
  return (
    <div className="home">
      <div className="subhome">
        <Header />
        <About />
        <hr />
        <Teaching />
      </div>
    </div>
  );
};
