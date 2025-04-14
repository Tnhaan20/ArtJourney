import HomeAchieve from "../../components/layout/HomePage/HomeAchieve";
import HomeGuide from "../../components/layout/HomePage/HomeGuide";
import HomePrice from "../../components/layout/HomePage/HomePrice";
import HomeStep from "../../components/layout/HomePage/HomeStep";
import HomeTopic from "../../components/layout/HomePage/HomeTopic";

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
