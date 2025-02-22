import HomeAchieve from "../../components/HomeGuide/HomeAchieve";
import HomeGuide from "../../components/HomeGuide/HomeGuide";
import HomePrice from "../../components/HomeGuide/HomePrice";
import HomeStep from "../../components/HomeGuide/HomeStep";
import HomeTopic from "../../components/HomeGuide/HomeTopic";

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
