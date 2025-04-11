import HomeAchieve from "../../components/HomePage/HomeAchieve";
import HomeGuide from "../../components/HomePage/HomeGuide";
import HomePrice from "../../components/HomePage/HomePrice";
import HomeStep from "../../components/HomePage/HomeStep";
import HomeTopic from "../../components/HomePage/HomeTopic";

export default function HomePage() {
  return (
    <div>
      <div>
        <HomeGuide />
      </div>
      <div>
        <HomeTopic />
      </div>
      <div>
        <HomeStep />
      </div>
      <div>
        <HomeAchieve />
      </div>
      <div>
        <HomePrice />
      </div>
      
    </div>
  );
}
