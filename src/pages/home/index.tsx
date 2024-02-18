import "./style.scss";
import { Stack } from "@mui/material";
import IntroSection from "./IntroSection";
import InfoSection from "./InfoSection";
import HospitalSection from "./HospitalSection";
import DownloadSection from "./DownloadSection";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const HomePage = () => {
  //test
  const { ref: introRef, inView: introIsVisible } = useInView({
    triggerOnce: true,
  });
  const { ref: infoRef, inView: infoIsVisible } = useInView({
    triggerOnce: true,
  });
  const { ref: hospitalRef, inView: hospitalIsVisible } = useInView({
    triggerOnce: true,
  });
  const { ref: downloadRef, inView: downloadIsVisible } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    reveal();
  }, []);
  window.addEventListener("scroll", reveal);

  return (
    <Stack flexDirection="column" paddingBottom="30px">
      <IntroSection ref={introRef} introIsVisible={introIsVisible} />
      <InfoSection ref={infoRef} infoIsVisible={infoIsVisible} />
      <HospitalSection
        ref={hospitalRef}
        hospitalIsVisible={hospitalIsVisible}
      />
      <DownloadSection
        ref={downloadRef}
        downloadIsVisible={downloadIsVisible}
      />
    </Stack>
  );
};

export default HomePage;

const reveal = () => {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
    // else {
    //   reveals[i].classList.remove('active');
    // }
  }
};
