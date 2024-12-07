import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen spartan">
      {/* Sidebar */}
      <aside className="bg-indigo-600 text-white w-full lg:w-1/4 py-10 px-6 lg:px-8 shadow-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          Terms Navigation
        </h2>
        <nav className="space-y-4">
          <a
            href="#use-of-app"
            className="block text-lg font-medium hover:text-gray-200 transition"
          >
            Use of the App
          </a>
          <a
            href="#business-listings"
            className="block text-lg font-medium hover:text-gray-200 transition"
          >
            Business Listings
          </a>
          <a
            href="#user-conduct"
            className="block text-lg font-medium hover:text-gray-200 transition"
          >
            User Conduct
          </a>
          <a
            href="#privacy-policy"
            className="block text-lg font-medium hover:text-gray-200 transition"
          >
            Privacy Policy
          </a>
          <a
            href="#limitation-liability"
            className="block text-lg font-medium hover:text-gray-200 transition"
          >
            Limitation of Liability
          </a>
          <a
            href="#updates-changes"
            className="block text-lg font-medium hover:text-gray-200 transition"
          >
            Updates and Changes
          </a>
        </nav>
      </aside>

      {/* Content */}
      <main className="w-full lg:w-3/4 bg-white p-8 lg:p-12 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 leading-relaxed mb-10 text-lg">
          Welcome to our Local Business Directory App! By accessing or using
          our application, you agree to abide by these Terms and Conditions.
          Please read them carefully before using our services.
        </p>

        <div id="use-of-app" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Use of the App
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            You may use the app for personal and non-commercial purposes only.
            Unauthorized use, such as scraping, cloning, or malicious behavior,
            is strictly prohibited.
          </p>
        </div>

        <div id="business-listings" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. Business Listings
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Businesses listed in our directory are responsible for the accuracy
            of their information. We do not endorse any specific business or
            guarantee the quality of their services.
          </p>
        </div>

        <div id="user-conduct" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. User Conduct
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Users must act responsibly and respectfully when leaving reviews or
            interacting with businesses. Offensive or misleading content may
            result in account suspension.
          </p>
        </div>

        <div id="privacy-policy" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Privacy Policy
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We value your privacy and are committed to protecting your personal
            data. For detailed information, please refer to our Privacy Policy.
          </p>
        </div>

        <div id="limitation-liability" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are not liable for any losses or damages resulting from your use
            of the app or interactions with businesses listed here.
          </p>
        </div>

        <div id="updates-changes" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. Updates and Changes
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We may update these Terms and Conditions periodically. Continued
            use of the app signifies your acceptance of any changes.
          </p>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mt-10">
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at{" "}
          <a
            href="mailto:support@localbizapp.com"
            className="text-blue-600 hover:underline"
          >
            support@localbizapp.com
          </a>
          .
        </p>
        <div className="flex justify-end mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-8 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300">
            Accept Terms
          </button>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
