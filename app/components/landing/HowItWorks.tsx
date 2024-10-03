import { useMemo, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"; // assuming you have the useGSAP hook

const HowItWorks = () => {
  const steps = useMemo(
    () => [
      {
        heading: "Post a Question",
        description:
          "Have a question? Whether it’s for homework, exam prep, or just curiosity, post it on our platform. The more detailed your question, the better the response!",
      },
      {
        heading: "Get Real-Time Answers",
        description:
          "Receive quick, helpful answers from our engaged community of students, educators, and professionals.",
      },
      {
        heading: "Learn and Grow",
        description:
          "Explore diverse perspectives, explanations, and solutions. Expand your understanding and master any subject, anytime.",
      },
    ],
    []
  );

  const carouselRef = useRef<(HTMLElement | null)[]>([]);
  const currentFocusRef = useRef(0);

  useGSAP(() => {
    const scaleValues = [1, 0.8, 0.6];
    const yValues = [0, 30, 60];
    const zIndexValues = [3, 2, 1];
    const opacityValues = [1, 1, 0];

    const updatePositions = (focusIndex: number) => {
      steps.forEach((_, i) => {
        const element = carouselRef.current[i];
        const relativeIndex = (i - focusIndex + steps.length) % steps.length; // Get relative index based on focus

        // Animate each element to its new position
        gsap.to(element, {
          scale: scaleValues[relativeIndex],
          y: yValues[relativeIndex],
          zIndex: zIndexValues[relativeIndex],
          opacity: opacityValues[relativeIndex],
          duration: 1.2,
          onComplete: () => {
            gsap.to(element, { opacity: 1 });
          },
        });
      });
    };

    const animateFocusChange = () => {
      const focusedElement = carouselRef.current[currentFocusRef.current];

      // Animate the focused element to move up and fade out
      gsap.to(focusedElement, {
        y: -100,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // After animation, update focus to the next element
          const nextFocus = (currentFocusRef.current + 1) % steps.length;
          currentFocusRef.current = nextFocus; // Update the ref for the next focus
          // Reset the y and opacity for the previous focus element to reuse it

          // Update positions of all elements
          updatePositions(nextFocus);
          // gsap.set(focusedElement, { y: 60, opacity: 1 });
        },
      });
    };

    // Initial position update
    updatePositions(currentFocusRef.current);

    const interval = setInterval(() => {
      animateFocusChange(); // Change focus on each interval
    }, 3000);

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <section className="bg-lines flex flex-col items-center gap-6 h-[50vh] w-full bg-cover  md:mx-20 py-10 px-8">
      <h2 className="text-3xl font-medium">How it Works</h2>
      <div className="flex flex-col gap-5 py-10 w-full items-center relative">
        {steps.map((step, index) => (
          <article
            className="flex flex-col border shadow-md items-center justify-center text-center h-[150px] w-full md:w-2/3 p-5 rounded-3xl bg-white text-black absolute"
            key={index}
            ref={(el) => (carouselRef.current[index] = el)} // Attach refs to each element
          >
            <h3 className="text-xl font-semibold">{step.heading}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
