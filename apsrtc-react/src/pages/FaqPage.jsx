import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqList = [
    {
      question: "How do I apply for leave?",
      answer:
        "Go to the Dashboard and click on the 'Apply Leave' button. Fill the form with correct details and submit. You can track your leave status under the same dashboard page.",
    },
    {
      question: "How are tasks assigned to employees?",
      answer:
        "Tasks are automatically assigned based on your role, district, depo, and availability. Previous and upcoming tasks are shown on your dashboard.",
    },
    {
      question: "What should I do if I forget my password?",
      answer:
        "Use the 'Forgot Password' option on the Login page. Follow the email verification steps to reset your password securely.",
    },
    {
      question: "How does admin approve or reject leave?",
      answer:
        "Admins can navigate to the Leave Requests section where pending requests appear. They can approve or reject each request and the employee will be notified.",
    },
    {
      question: "What is my role in the system?",
      answer:
        "Your role determines the permissions and pages you can access. For example, ADMIN users can manage employees and tasks, while employees can only manage their own tasks and profile.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Frequently Asked Questions
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Find answers to the most common questions about our system. If you need
        further help, contact the admin.
      </p>

      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <div
            key={index}
            className="bg-surface-elevated rounded-2xl shadow-md border border-slate-300/45 transition hover:shadow-lg"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left"
            >
              <span className="text-lg font-medium text-gray-900">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-gray-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
