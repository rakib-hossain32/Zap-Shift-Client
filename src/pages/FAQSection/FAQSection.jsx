import React from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, it is designed to fit comfortably and adjust to a wide range of ages and body types.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Consistent use of a posture corrector can significantly reduce back pain and improve posture.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Some models include additional smart features such as posture alerts to remind you throughout the day.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can subscribe to our email notifications to stay updated about restock alerts.",
    },
  ];

  return (
    <div className="w-full py-14 ">
      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <p className="text-center text-green-600 font-semibold tracking-wide text-sm">
          Frequently Asked Question (FAQ)
        </p>

        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#1D293D] mt-2">
          Enhance posture, mobility & well-being with ease
        </h2>

        <p className="text-center text-slate-500 mt-3 max-w-2xl mx-auto">
          Achieve proper alignment, reduce pain, and strengthen your body
          effortlessly.
        </p>

        {/* FAQ box */}
        <div className="mt-10 bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-2 md:p-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`border border-slate-200 rounded-xl mb-3 px-5 py-4 cursor-pointer transition-all duration-300 ${
                openIndex === index
                  ? "bg-green-50 border-green-300"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-medium text-[#1D293D]">
                  {faq.question}
                </h3>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-all duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? "max-h-40 opacity-100 mt-3"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-10">
          <button className="bg-green-500 text-white text-sm font-medium px-6 py-3 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-200">
            See More FAQ’s
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4.5L10.5 9L6 13.5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
