import axios from "axios";
import { CheckCircle } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const plans = [
  {
    name: "Silver",
    price: "₹199",
    duration: "/month",
    color: "border-gray-400",
    button: "btn-outline",
    features: [
      "20 Connection Requests",
      "Unlimited Profile Views",
      "Chat with other people",
      "3 Months",
    ],
  },
  {
    name: "Gold",
    price: "₹499",
    duration: "/month",
    popular: true,
    color: "border-warning",
    button: "btn-warning",
    features: [
      "Unlimited Connection Requests per day",
      "See Who Viewed Your Profile",
      "Chat with other people",
      "6 Months",
      "Blue Tick",
    ],
  },
  {
    name: "Platinum",
    price: "₹999",
    duration: "/month",
    color: "border-primary",
    button: "btn-primary",
    features: [
      "Everything in Gold",
      "Profile Boost",
      "Verified Premium Badge",
      "Advanced Filters",
      "Exclusive Events Access",
      "24/7 Premium Support",
    ],
  },
];

const Premium = () => {
  const [isUserPremiun, setUserPremium] = useState(false);
  async function verifyPremiumUser() {
    const response = await axios.get(BASE_URL + "/payment/verify", {
      withCredentials: true,
    });

    if (response.data.isPremium) {
      setUserPremium(true);
    }
  }

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  async function handleBuyClick(type) {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          membershipType: type.toLowerCase(),
        },
        {
          withCredentials: true,
        },
      );

      console.log(order);
      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Dev Catchup",
        description: "Connect to other developers",
        order_id: orderId,

        prefill: {
          name: notes?.firstName + " " + notes?.lastName,
          email: notes.emailId,
          contac: "8374021152",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  }
  return isUserPremiun ? (
   <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4">
  <div className="max-w-lg w-full bg-base-100 shadow-2xl rounded-3xl p-8 text-center border border-success/20">
    
    <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-success"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <h1 className="text-3xl font-bold text-success">
      You're Already a Premium Member 🎉
    </h1>

    <p className="mt-4 text-base-content/70 leading-relaxed">
      Your premium membership is active and you have full access to all exclusive
      features, unlimited connections, and priority benefits.
    </p>

    <button
      className="btn btn-success mt-8 px-8"
      onClick={() => window.history.back()}
    >
      Go Back
    </button>
  </div>
</div>
  ) : (
    <div className="min-h-screen bg-base-200 py-14 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold">
            Upgrade to <span className="text-primary">Premium</span>
          </h1>

          <p className="mt-5 text-lg text-base-content/70 max-w-2xl mx-auto">
            Unlock exclusive features, connect with more developers, and get
            noticed faster.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card bg-base-100 shadow-2xl border-2 ${plan.color} hover:scale-105 transition-all duration-300 relative`}
            >
              {plan.popular && (
                <div className="badge badge-warning absolute top-4 right-4 text-white">
                  MOST POPULAR
                </div>
              )}

              <div className="card-body">
                <h2 className="card-title text-3xl justify-center">
                  {plan.name}
                </h2>

                <div className="text-center my-5">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-base-content/60">{plan.duration}</span>
                </div>

                <div className="divider"></div>

                <ul className="space-y-4 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="card-actions mt-8">
                  <button
                    onClick={() => handleBuyClick(plan.name)}
                    className={`btn ${plan.button} btn-block`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-10">
            Why Go Premium?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-5xl">🚀</div>
                <h3 className="font-bold text-lg">Faster Connections</h3>
                <p className="text-base-content/70">
                  Reach more developers instantly.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-5xl">👀</div>
                <h3 className="font-bold text-lg">Profile Insights</h3>
                <p className="text-base-content/70">
                  Know who visited your profile.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-5xl">⭐</div>
                <h3 className="font-bold text-lg">Premium Badge</h3>
                <p className="text-base-content/70">
                  Stand out from other developers.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-5xl">💬</div>
                <h3 className="font-bold text-lg">Priority Support</h3>
                <p className="text-base-content/70">
                  Get your issues resolved faster.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="hero mt-20 rounded-3xl bg-gradient-to-r from-primary to-secondary text-primary-content">
          <div className="hero-content text-center py-16">
            <div>
              <h1 className="text-4xl font-bold">
                Ready to level up your networking?
              </h1>

              <p className="py-6 max-w-xl mx-auto">
                Join thousands of developers using Premium to build meaningful
                professional connections.
              </p>

              <button className="btn btn-neutral btn-lg">Get Premium</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
