import ExternalLink from "./ExternalLink";

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-2xl relative">
        <div className="text-2xl tracking-tight">
          Previously, I...
          <ul className="list-decimal list-inside space-y-1">
            <li>
              eeee
            </li>
            <li>
              Geee <span className="link">Art Practice</span> undergrad degree
              eee
            </li>
            <li>
              Interned at{" "}
              <ExternalLink href="https://www.instagram.com/reel/CvKqy5dr65S/?igsh=NTc4MTIwNjQ2YQ==">
                eee
              </ExternalLink>
              .
            </li>
            <li>
              Helped run{" "}
              <ExternalLink href="https://friendsandfam.xyz/">Friends and Family</ExternalLink>,{" "}
              <span className="link">Stanford AKPsi</span>, sdfds{" "}
              <span className="link">lsdfd</span>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
