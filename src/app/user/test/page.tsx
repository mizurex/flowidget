import React from 'react';

const FAQComponent = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner, fill out the form with your email and password, then verify your email address."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. Enterprise customers can also pay via wire transfer."
    },
    {
      question: "How do I reset my password?",
      answer: "Go to the login page, click 'Forgot Password', enter your email, and check your inbox for reset instructions."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel anytime from your account settings. Your access continues until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all new subscriptions. Contact support for refund requests."
    },
    {
      question: "How do I integrate with my existing tools?",
      answer: "We support integrations with Slack, Discord, Zapier, and 50+ other platforms. Check our integrations page for setup guides."
    },
    {
      question: "What's your uptime guarantee?",
      answer: "We guarantee 99.9% uptime with automatic failover and 24/7 monitoring. View our status page for real-time updates."
    },
    {
      question: "How do I upgrade my plan?",
      answer: "Go to Account Settings > Billing, select your new plan, and confirm. Changes take effect immediately."
    },
    {
      question: "Do you have an API?",
      answer: "Yes, we provide a comprehensive REST API with full documentation, SDKs, and code examples for popular languages."
    },
    {
      question: "How do I customize my widget?",
      answer: "Use our drag-and-drop builder to customize colors, fonts, layout, and functionality. Changes preview in real-time."
    },
    {
      question: "What analytics do you provide?",
      answer: "Track widget performance, user interactions, conversion rates, and engagement metrics with our built-in analytics dashboard."
    },
    {
      question: "Can I use custom CSS?",
      answer: "Yes, add custom CSS to match your brand perfectly. We also provide pre-built themes for quick styling."
    }
  ];

  return (
    <div className="bg-[#030712] rounded-xl shadow-lg overflow-hidden max-w-5xl h-[120vh] pt-10 mx-auto">
      {/* Browser Header */}
      <div className="bg-gray-50 px-6 py-4  border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-600 text-sm">info.flowidget.site/faq</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold  mb-2"> Frequently Asked Questions</h2>
          <p className="">Find answers to common questions</p>
        </div>
        
        {/* FAQ Items */}
        <div className="h-96 overflow-y-auto ">
          {faqs.map((faq, index) => (
            <div key={index} className="">
              <div className="p-4 bg-[#030712]">
                <h3 className="font-semibold ">{faq.question}</h3>
              </div>
              <div className="p-4  text-sm">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-white font-extrabold text-sm">...and 47 more questions</p>
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;