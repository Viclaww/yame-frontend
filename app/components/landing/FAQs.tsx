import FaqItem from "./FaqItem";
const FAQSection = () => {
  const faqs = [
    {
      head: "How quickly can I get answers?",
      desc: "You can expect real-time responses! Our active community of learners and educators is always ready to help.",
    },
    {
      head: "Can I help others?",
      desc: "Absolutely! You can both ask questions and help others by answering theirs.",
    },
    {
      head: "Is it free to use?",
      desc: "Yes, posting questions and getting answers is completely free.",
    },
    {
      head: "What subjects are covered?",
      desc: "We cover a wide range of subjects, including math, science, literature, social studies, and more.",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold text-center my-5 text-blueBlack">
        FAQs
      </h2>
      <div className="flex flex-col-reverse md:flex-row items-center">
        <div className="flex gap-2 px-3 md:px-20 flex-col">
          {faqs.map(({ head, desc }, index) => (
            <FaqItem key={index} head={head} desc={desc} index={index} />
          ))}
        </div>
        <img className="md:w-1/3 w-2/3" src="/assets/brain2.png" alt="" />
      </div>
    </div>
  );
};

export default FAQSection;
