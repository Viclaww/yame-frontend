const WhyChooseUs = () => {
  const reasons = [
    {
      image: "/assets/why1.png",
      heading: "Instant Answers",
      desc: "No more waiting for replies—get answers as soon as you need them.",
    },
    {
      image: "/assets/why2.png",
      heading: "Global Community",
      desc: "Engage in meaningful discussions, share knowledge, and deepen your understanding through peer-to-peer support.",
    },
    {
      image: "/assets/why1.png",
      heading: "Collaborative Learning",
      desc: "No more waiting for replies—get answOur simple interface lets you ask, answer, and explore with ease.ers as soon as you need them.",
    },
  ];
  return (
    <section className="flex flex-col p-10 gap-10 items-center">
      <h2 className="text-2xl font-medium">Why Choose Us?</h2>
      <section className="flex flex-col flex-wrap items-center gap-10 justify-center md:flex-row">
        {reasons.map(({ image, heading, desc }) => (
          <article
            className="flex flex-col md:w-1/3 w-full h-[250px] items-center bg-gradient1 p-5 rounded-md text-white"
            key={heading}
          >
            <img src={image} className="w-16 h-16" alt="" />
            <h3>{heading}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </section>
    </section>
  );
};

export default WhyChooseUs;
